import React from 'react'
import Img from "gatsby-image"
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

const Container = styled.div`
  position: relative;
  z-index: 1;
  background: #000;
  height: 85vh;
  overflow: hidden;

  ${breakpoint('tablet') `
    height: auto;
  `}
`

const ButtonsContainer = styled.div`
  z-index: 10;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  ${breakpoint('tablet') `
    left: 80px;
    bottom: -50px;
    display: block;
  `}
`

const Button = styled.button`
  display: block;
  background: ${props => props.active ? props.theme.mainColor : '#000'};
  color: #fff;
  border: none;
  text-align:center;
  padding: 12px;
  position:relative;
  font-size: 11px;

  &:after {
    content: "";
    position:absolute;
    width: 0;
    height: 0;
    display:block;
    left: 50%;
    bottom: 99%;
    margin-left: -10px;
    border-bottom: ${props => props.active ? `solid 10px ${props.theme.mainColor}` : 'none'};
    border-left: ${props => props.active ? `solid 10px transparent` : 'none'};
    border-right: ${props => props.active ? `solid 10px transparent` : 'none'};
    border-top: none;
  }

  &:focus {
    outline: none;
  }

  ${breakpoint('tablet') `
    width: 250px;
    height: 90px;
    border-bottom: ${props => props.active ? `solid 1px ${props.theme.mainColor}` : 'solid 1px #333'};
    text-align:left;
    font-size: 13px;
    padding: 0 30px;

    &:after {
      left: 100%;
      top: 50%;
      bottom: auto;
      margin-left: 0;
      margin-top: -10px;
      border-left: ${props => props.active ? `solid 10px ${props.theme.mainColor}` : 'none'};
      border-bottom: ${props => props.active ? `solid 10px transparent` : 'none'};
      border-top: ${props => props.active ? `solid 10px transparent` : 'none'};
    }
  `}
`

const SlideDescription = styled.div`
  display: block;
  position: absolute;
  width: 550px;
  bottom: 80px;
  right: 80px;
  background: rgba(0,0,0,0.5);
  color: #fff;
  font-size: 28px;
  z-index: 4;
  text-align:right;
  padding: 30px;
  box-sizing:border-box;
  font-weight: 100;
  font-family: 'Montserrat', sans-serif;

  ${breakpoint('tablet') `
    font-size: 40px;
  `}
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
      <Container>

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

        <ButtonsContainer>
          {this.props.slides.map((slide, index) =>
            <Button
              key={slide.node.id}
              onClick={e => this.changeSlide(index)}
              active={index === visibleSlideIndex}
            >
              {slide.node.title}
            </Button>
          )}
        </ButtonsContainer>

      </Container>
    )
  }
}

export default Slider
