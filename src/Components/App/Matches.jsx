import React, { useState } from 'react'
import { Text, Card } from '@radix-ui/themes';
import * as Avatar from '@radix-ui/react-avatar';

import { useGlobalContext } from '../../context'

// TODO
// Implement API Call
// Try to add skeleton as a loader while calling API

const Matches = () => {
    const { navTab, setNavTab } = useGlobalContext()
    const [tabName, setTabName] = useState("")

    return (
        <div className='h-[95vh] bg-black'>
            <div className='gap-5 flex flex-col pt-7'>
                <div onClick={() => setNavTab('Profile')} className='min-w-full bg-orange-400 flex justify-center items-center p-3 rounded-md gap-5'>

                    <div>
                        <Avatar.Root className="bg-blackA1 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                            <Avatar.Image
                                className="h-full w-full rounded-[inherit] object-cover"
                                src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                                alt="Colm Tuite"
                            />
                            <Avatar.Fallback
                                className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                                delayMs={600}
                            >
                                CT
                            </Avatar.Fallback>
                        </Avatar.Root>
                    </div>
                    <Text as="div" color="gray" size="2">
                        Visit Your Profile
                    </Text>

                </div>
                <div className='flex justify-evenly items-center'>
                    <button type='button' className='w-32 h-10 bg-blue-400 rounded-lg' onClick={() => setTabName("Match")}>Match</button>
                    <button type='button' className='w-32 h-10 bg-blue-400 rounded-lg' onClick={() => setTabName("Like")}>Like</button>
                </div>

                {/* <div>
                Call API in this div
            </div> */}
            </div>
        </div>

    )
}

export default Matches