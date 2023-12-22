import React from 'react';
import { useState, useRef, useMemo } from 'react';
import TinderCard from 'react-tinder-card';
import image from '../../assets/download.jpeg';
import flower from '../../assets/flower.jpg'
import leaf from '../../assets/leaf.jpg'

// const imageData = [{ id: "1", imageLink: flower }, { id: "2", imageLink: leaf },{ id: "3", imageLink: flower }]
const cardData = [{id:"1", imageData:[{ id: "1", imageLink: flower }, { id: "2", imageLink: leaf },{ id: "3", imageLink: flower }], name:"Hello World", age:'25'},{id:"2", imageData:[{ id: "1", imageLink: flower }, { id: "2", imageLink: leaf },{ id: "3", imageLink: flower }], name:"Hello", age:'20'},{id:"3", imageData:[{ id: "1", imageLink: flower }, { id: "2", imageLink: leaf },{ id: "3", imageLink: flower }], name:"World", age:'15'}]
// TODO
// Use Fetch API from backend
// Create a stack of tinder cards 
// Parameters for this component would be {profile, imageData}
// Try to make the tinderCard a different component


const Explore = () => {

    const [currentIndexArea, setCurrentIndexArea] = useState(0);
    const touchTracker = useRef({x:0, y:0})

    const [currentIndex, setCurrentIndex] = useState(cardData.length - 1)
    const currentIndexRef = useRef(currentIndex)

    const childRefs = useMemo(
        () =>
            Array(cardData.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < cardData.length - 1

    const canSwipe = currentIndex >= 0

    const swiped = (direction, nameToDelete, index) => {
        setCurrentIndexArea(0)
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (name, idx) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid
    }

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < cardData.length) {
            await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }

    const handleAreaClick = (e, areaName, totalCards) => {
        //console.log(`Clicked on ${areaName}`);
        const touch = e.changedTouches[0];
        touchTracker.current.x = touch.clientX
        touchTracker.current.y = touch.clientY
        //console.log(touchTracker.current.x, touchTracker.current.y);
        if(areaName == "LEFT_AREA"){
            setCurrentIndexArea((index)=>{
                if(index-1<0){
                    return totalCards - 1
                }
                return index-1
            })
        }
        if(areaName == "RIGHT_AREA"){
            setCurrentIndexArea((index)=>{
                if(index+1>totalCards - 1){
                    return 0
                }
                return index+1
            })
        }
      };


      const handleTouchEnd = (e) => {
        const touch = e.changedTouches[0];
        if(touchTracker.current.x - touch.clientX > 50){
            // left
            swipe('left')
        }
        else if(touchTracker.current.x - touch.clientX < -50){
            // right
            swipe('right')
        }
      };

    return (
        <>
            <div className='flex items-center flex-col h-[85vh] min-w-screen pt-5 bg-black1 overflow-x-hidden overflow-y-hidden'>
                
                    {cardData.map((card, index) => (
                        <TinderCard
                            ref={childRefs[index]}
                            className='absolute'
                            key={card.name}
                            onSwipe={(dir) => swiped(dir, card.name, index)}
                            onCardLeftScreen={() => outOfFrame(card.name, index)}
                        >
                            <div className='bg-white-500 rounded-lg overflow-hidden p-1'>

                                <map name="workmap">
                                <area
                                    shape="rect"
                                    coords="0,0,175,616"
                                    alt="LEFT_AREA"
                                    onClick={(e) => handleAreaClick(e, 'LEFT_AREA', card.imageData.length)}
                                    onTouchStart={(e) => handleAreaClick(e, 'LEFT_AREA', card.imageData.length)}
                                    // onTouchMove={()=>handleTouchMove('right')}
                                    onTouchEnd={handleTouchEnd}
                                />
                                <area
                                    shape="rect"
                                    coords="175,0,350,616"
                                    alt="RIGHT_AREA"
                                    onClick={(e) => handleAreaClick(e, 'RIGHT_AREA', card.imageData.length)}
                                    onTouchStart={(e) => handleAreaClick(e, 'RIGHT_AREA', card.imageData.length)}
                                    // onTouchMove={()=>handleTouchMove('left')}
                                    onTouchEnd={handleTouchEnd}
                                />
                            </map>
                                <img
                                    src={card.imageData[currentIndexArea].imageLink}
                                    alt={`Image ${card.imageData[currentIndexArea].id}`}
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
                    ))}
                

            </div>
            <div className='flex justify-evenly items-center gap-5 bg-black h-[9vh]'>
                <button type="button" className="w-2/6 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600 " onClick={() => swipe('left')}>Swipe Left</button>
                <button type="button" className="w-2/6 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600 " onClick={() => swipe('right')}>Swipe Right</button>
            </div>
        </>
    );
};

export default Explore;
