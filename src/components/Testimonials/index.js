import React from "react"
import Wrapper from '../../components/Layout/Wrapper'
import styled from 'styled-components'
import FaAngleRight from 'react-icons/lib/fa/angle-right'
import FaAngleLeft from 'react-icons/lib/fa/angle-left'

const TestimonialsWrapper = Wrapper.extend`
  margin-bottom: 40px;
`

const Button = styled.button`
  color: #000;
  font-size: 12px;
  padding: 4px;
  line-height: 12px;
  margin-left: 10px;
`

class Testimonials extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      visibleSlide: 0,
      sliderPosition: 0,
    }
    this.setSliderPosition = this.setSliderPosition.bind(this)
    this.getNextSlideIndex =this.getNextSlideIndex.bind(this)
  }

  getNextSlideIndex(change){
    var currentVisileSlide = this.state.visibleSlide
    var slideCount = this.props.items.length - 1
    if (change > 0 && currentVisileSlide < slideCount){
      return currentVisileSlide + change
    } else if (change < 0 && currentVisileSlide > 0){
      return currentVisileSlide + change
    } else if (change > 0 && currentVisileSlide === slideCount){
      return 0
    } else if (change < 0 && currentVisileSlide === 0){
      return slideCount
    } else {
      return currentVisileSlide
    }
  }

  setSliderPosition(change){
    var sliderWidth = this.slidingDiv.getBoundingClientRect().width
    var sliderPosition = this.slidingDiv
    var visibleSlide = this.getNextSlideIndex(change)
    var sliderPosition = visibleSlide * (sliderWidth * -1)
    this.setState({visibleSlide, sliderPosition})
  }

  componentDidMount(){
    setInterval(() => {this.setSliderPosition(1)}, 7000);
  }

  render() {
    const testimonialItems = this.props.items.map((slide, index) =>
      <li
        style={{
          listStyle: `none`,
          padding: 0,
          margin: 0,
          width: `100%`,
          flexShrink: 0,
          flexGrow: 1,
          opacity: index === this.state.visibleSlide ? 1 : 0,
          transition: `opacity 0.4s ease`,
        }}
        key={slide.node.id}>
        "{slide.node.content.content}" {slide.node.client} - {slide.node.location}
      </li>
    );
    return(
      <TestimonialsWrapper>
        <div
          style={{
            padding: `30px 80px 40px 300px`,
            borderBottom: `1px solid #eeeeee`
          }}
          >
          <h2>How our customers feel about us</h2>
          <div
            style={{
              position: `relative`,
            }}
            >
            <div
              style={{
                overflow: `hidden`,
                position: `relative`,
              }}
              >
                <ul
                  ref={node => this.slidingDiv = node}
                  style={{
                    padding: 0,
                    margin: 0,
                    maringLeft: 0,
                    display: `flex`,
                    transform: `translateX(${this.state.sliderPosition}px)`,
                    transition: `transform 0.5s ease`,
                  }}
                  >
                    {testimonialItems}
                </ul>
            </div>
            <div
              style={{
                position: `absolute`,
                left: `100%`,
                bottom: 0,
                marginTop: `10px`,
                minWidth: `70px`,
              }}
              >
              <Button onClick={e =>this.setSliderPosition(-1)}><FaAngleLeft /></Button>
              <Button onClick={e =>this.setSliderPosition(1)}><FaAngleRight /></Button>
            </div>
          </div>
        </div>
      </TestimonialsWrapper>
    )
  }
}

export default Testimonials
