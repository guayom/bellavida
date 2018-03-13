import React from 'react'
import Img from "gatsby-image"
import styled from 'styled-components'

const Button = styled.button`
  display: block;
  width: 250px;
  height: 90px;
  background: ${props => props.active ? props.theme.mainColor : '#000'};
  color: #fff;
  border: none;
  text-align:left;
  padding: 0 30px;
  border-bottom: ${props => props.active ? `solid 1px ${props.theme.mainColor}` : 'solid 1px #333'};
  position:relative;

  &:after {
    content: "";
    position:absolute;
    width: 0;
    height: 0;
    display:block;
    left: 100%;
    top: 50%;
    margin-top: -10px;
    border-left: ${props => props.active ? `solid 10px ${props.theme.mainColor}` : 'none'};
    border-bottom: ${props => props.active ? `solid 10px transparent` : 'none'};
    border-top: ${props => props.active ? `solid 10px transparent` : 'none'};
    border-right: none;
  }

  &:focus {
    outline: none;
  }
`

const SlideDescription = styled.div`
  display: block;
  position: absolute;
  width: 550px;
  bottom: 80px;
  right: 80px;
  background: rgba(0,0,0,0.5);
  color: #fff;
  font-size: 40px;
  z-index: 4;
  text-align:right;
  padding: 30px;
  box-sizing:border-box;
  font-weight: 100;
  font-family: 'Montserrat', sans-serif;
`

class Slider extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      visibleSlide: 0,
    }
    this.changeSlide = this.changeSlide.bind(this)
    this.getNextSlide = this.getNextSlide.bind(this)
    this.timer = this.timer.bind(this)
  }

  changeSlide(visibleSlide){
    this.setState({visibleSlide})
  }

  getNextSlide(){
    if (this.state.visibleSlide === this.props.slides.length - 1){
      this.setState({visibleSlide: 0})
    } else if (this.state.visibleSlide < this.props.slides.length - 1) {
      this.setState({visibleSlide: this.state.visibleSlide + 1})
    }
  }

  timer() {
    this.getNextSlide()
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    var visibleSlideIndex = this.state.visibleSlide
    var visibleSlide = this.props.slides[visibleSlideIndex].node
    var visibleSlideImage = visibleSlide.image.resolutions

    return(
      <div
        style={{
          position: `relative`,
          zIndex:1,
          background: '#000'
        }}
        >

        <div
          style={{
            zIndex:10,
            position: `absolute`,
            left: `80px`,
            bottom: `-50px`,
          }}
          >
          {this.props.slides.map((slide, index) =>
            <Button
              key={slide.node.id}
              onClick={e => this.changeSlide(index)}
              active={index === visibleSlideIndex}
              >
              {slide.node.title}
            </Button>
          )}
        </div>

        <SlideDescription>
          {visibleSlide.title}
        </SlideDescription>

        <div
          style={{
            paddingTop: `48.4%`,
          }}
          >
          {this.props.slides.map((slide, index) =>
            <Img
              key={slide.node.id}
              style={{
                margin: 0,
                position: `absolute`,
                top: 0,
                left: 0,
                width: `100%`,
                opacity: visibleSlideIndex === index ? 1 : 0,
                transition: `opacity 0.8s ease`
              }}
              resolutions={slide.node.image.resolutions}
            />
          )}
        </div>

      </div>
    )
  }
}

export default Slider
