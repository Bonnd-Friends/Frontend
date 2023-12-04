import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';

import { useGlobalContext } from '../../context';

const AppNavBar = () => {
    const {navTab,setNavTab} = useGlobalContext()

    const handleClick = (e) => {
        setNavTab(e.target.innerHTML)
    }
    return (
        <Tabs.Root
            className="flex flex-col shadow-[0_2px_10px] shadow-blackA2 min-w-full h-1/6"
            defaultValue={navTab}
        >
            <Tabs.List className="shrink-0 flex border-b border-mauve6" aria-label="Manage your account">
                <Tabs.Trigger
                    className="bg-white px-5 h-[55px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                    value="Explore"
                    onClick={handleClick}
                >
                    Explore
                </Tabs.Trigger>
                <Tabs.Trigger
                    className="bg-white px-5 h-[55px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                    value="Profile"
                    onClick={handleClick}
                >
                    Profile
                </Tabs.Trigger>
                <Tabs.Trigger
                    className="bg-white px-5 h-[55px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                    value="Matches"
                    onClick={handleClick}
                >
                    Matches
                </Tabs.Trigger>
            </Tabs.List>

        </Tabs.Root>
    );
};

export default AppNavBar;