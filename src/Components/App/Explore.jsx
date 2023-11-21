import React from 'react';
import TinderCard from 'react-tinder-card';
import image from '../../../public/download.jpeg';

const Explore = () => {
    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction);
    };

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen');
    };

    return (
        <div className='flex items-center flex-col min-h-screen min-w-screen bg-black overflow-x-hidden overflow-y-hidden'>

            <TinderCard
                onSwipe={onSwipe}
                onCardLeftScreen={() => onCardLeftScreen('fooBar')}
                preventSwipe={['up', 'down']}

            >
                <div className='bg-white rounded-lg min-h-screen'>
                    <div
                        className='rounded-lg'
                        style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', height: '75vh', width: '95vw', position: 'relative' }}
                    >
                        <div className='top-[26rem] relative flex justify-between'>
                            <div className='left-5 relative'>
                                <h1 className='text-white text-2xl font-semibold'>Hello World</h1>
                                <h1 className='text-white text-xl'>Hello</h1>
                            </div>
                            <div className='right-5 relative top-10'>
                                <button type='button' className='text-white'>Show More Info</button>
                            </div>
                        </div>

                    </div>

                </div>

            </TinderCard>
            <div className='flex justify-evenly items-center gap-5 absolute top-[85vh]'>
                <button type="button" className="w-2/6 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600 mt-4" onClick={() => onSwipe('left')}>Swipe Left</button>
                <button type="button" className="w-2/6 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600 mt-4" onClick={() => onSwipe('right')}>Swipe Right</button>
            </div>
        </div>
    );
};

export default Explore;
