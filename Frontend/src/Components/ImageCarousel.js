import Carousel from "react-bootstrap/Carousel";
import a from './Imagess/project1.jpg';
import b from './Imagess/project2.jpg';
import c from './Imagess/project3.jpg';
import d from './Imagess/project4.jpg';

function ImageCarousel() {
  return (
    <Carousel>
      <Carousel.Item interval={1500}>
        <img className="d-block w-100" src={a} alt=""
          style={{ objectFit: "cover", height: "500px" }} />
        
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img className="d-block w-100"
          src={b}
          alt=""
          style={{ objectFit: "cover", height: "500px" }}/>  
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img
         className="d-block w-100" src={c} alt=""
          style={{ objectFit: "cover", height: "500px" }}/>      
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img className="d-block w-100"src={d} alt=""
          style={{ objectFit: "cover", height: "500px" }} />
      </Carousel.Item>
    </Carousel>
  );
}

export default ImageCarousel;