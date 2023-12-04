import React from 'react';
import { useState, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import image from '../../assets/download.jpeg';
import flower from '../../assets/flower.jpg'
import leaf from '../../assets/leaf.jpg'


const imageData = [{id:"1", imageLink:flower},{id:"2", imageLink:leaf}]

// TODO
// Use Fetch API from backend
// Create a stack of tinder cards 
// Parameters for this component would be {profile, imageData}
// Try to make the tinderCard a different component


const Explore = () => {
    // The currentIndex is used after we fetch data from backend
    // Data is in array of objects form example => [{}, {}, {}]
    const [currentIndex, setCurrentIndex] = useState(0);
    // This is a ref for the tinderCard
    const tinderCardRef = useRef(0)
    const touchTracker = useRef({x:0, y:0})

    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction);
        // Call our backend api to store the user opinon (like or dislike )
    };

    // This Function does not have any use but still if we need we can use it later
    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen');
    };

    const handleAreaClick = (e, areaName) => {
        //console.log(`Clicked on ${areaName}`);
        const touch = e.changedTouches[0];
        touchTracker.current.x = touch.clientX
        touchTracker.current.y = touch.clientY
        //console.log(touchTracker.current.x, touchTracker.current.y);
        
        if(areaName == "LEFT_AREA"){
            setCurrentIndex((index)=>{
                if(index-1<0){
                    return imageData.length - 1
                }
                return index-1
            })
        }
        if(areaName == "RIGHT_AREA"){
            setCurrentIndex((index)=>{
                if(index+1>imageData.length - 1){
                    return 0
                }
                return index+1
            })
        }
      };

      // This Function is used when we click Swipe buttons
      const onSwipeButton = (direction) =>{
        tinderCardRef.current.swipe(direction)
      }

      const handleTouchEnd = (e) => {
        const touch = e.changedTouches[0];
        if(touchTracker.current.x - touch.clientX > 50){
            // left
            onSwipeButton('left')
        }
        else if(touchTracker.current.x - touch.clientX < -50){
            // right
            onSwipeButton('right')
        }
      };


      const handleTouchMove = (direction) => {
        tinderCardRef.current.swipe(direction)
      }
      

    return (
        <>
        <div className='flex items-center flex-col h-[85vh] min-w-screen bg-black overflow-x-hidden overflow-y-hidden'>

            <TinderCard
                onSwipe={onSwipe}
                onCardLeftScreen={() => onCardLeftScreen('fooBar')}
                preventSwipe={['up', 'down']}
                ref={tinderCardRef}
            >
                <div className='bg-orange-500 rounded-lg overflow-hidden p-1'>

                    <map name="workmap">
                        <area
                            shape="rect"
                            coords="0,0,175,616"
                            alt="LEFT_AREA"
                            onClick={() => handleAreaClick('LEFT_AREA')}
                            onTouchStart={(e) => handleAreaClick(e, 'LEFT_AREA')}
                            // onTouchMove={()=>handleTouchMove('right')}
                            onTouchEnd={handleTouchEnd}
                        />
                        <area
                            shape="rect"
                            coords="175,0,350,616"
                            alt="RIGHT_AREA"
                            onClick={() => handleAreaClick('RIGHT_AREA')}
                            onTouchStart={(e) => handleAreaClick(e, 'RIGHT_AREA')}
                            // onTouchMove={()=>handleTouchMove('left')}
                            onTouchEnd={handleTouchEnd}
                        />
                    </map>
                    <img
                        src={imageData[currentIndex].imageLink}
                        alt={`Image ${imageData[currentIndex].id}`}
                        draggable="false"
                        height={616}
                        width={350}
                        className='object-cover rounded-lg'
                        useMap="#workmap"
                    />



                    <div className='flex justify-between absolute top-[500px] w-full'>
                        <div className='p-3'>
                            <h1 className='text-white text-2xl font-semibold'>Hello World</h1>
                            <h1 className='text-white text-xl'>Hello</h1>
                        </div>
                        <div className='right-5 relative top-10 p-3'>
                            <button type='button' className='text-white'>Show More Info</button>
                        </div>
                    </div>

                </div>

            </TinderCard>
            
        </div>
        <div className='flex justify-evenly items-center gap-5 bg-black h-[9vh]'>
            <button type="button" className="w-2/6 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600 " onClick={() => onSwipeButton('left')}>Swipe Left</button>
            <button type="button" className="w-2/6 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600 " onClick={() => onSwipeButton('right')}>Swipe Right</button>
        </div>
        </>
    );
};

export default Explore;
