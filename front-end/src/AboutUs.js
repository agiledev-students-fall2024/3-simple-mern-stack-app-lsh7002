import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import './AboutUs.css';

const AboutUs = () => {
  const [data, setData] = useState({ bio: 'My name is Lindsey, and I am a senior at New York University. I am originally from Los Angeles, California. I loved growing up in California. Because California is so diverse in so many different ways, I never felt there were any limitations to what I could do growing up. I had access to the mountains, beaches and the city. I could be hiking in the mountains one day and at the beach the next day. My family is comprised of my parents, my sister, my dog and me. As a family, we enjoy surfing, playing tennis, taking walks along the beach and eating at new restaurants. I am very close with my family, and they often fly out to New York to visit me. I have been playing volleyball since I was in fifth grade. I was recruited to play on the NYU volleyball team when I was in high school. I played on the team for three years. I currently live with three of my old teammates. I am also a part of a sorotity at NYU. It has been a great way to meet new girls on campus. Overall, I have really enjoyed my time at NYU. There is an abundance of things to do and places to visit in the city. I think that New York City is the best place to live for young people. I am someone who loves to try new things. I enjoy trying new restaurants with friends and exploring the different neighborhoods of New York. While I am sad that my time at NYU is coming to a close, I am very grateful that I will still be in New York after I graduate.',
  imageUrl: '/lindsey.jpg' }); 


  useEffect(() => {
    axios.get('/api/about')
      .then((response) => {
        setData(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching About Us data:", error);
      });
  }, []);

  return (
    <div>
      <h1>About Us</h1>
      <p>{data.bio}</p>
      <img src={data.imageUrl} alt="About Us" className="about-image"/>
    </div>
  );
}

export default AboutUs;