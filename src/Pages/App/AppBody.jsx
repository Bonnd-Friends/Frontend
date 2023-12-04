import React from 'react'
import { useGlobalContext } from '../../context'
import Profile from '../../Components/App/Profile'

// import Explore from '../../Components/App/Explore'

const AppBody = () => {
  const {navTab} = useGlobalContext()

  // if(navTab == "Explore"){
  //   return <Explore />
  // }
  if(navTab == "Profile"){
    return <Profile/>
  }
  if(navTab == "Matches"){
    return <div>Matches</div>
  }
}

export default AppBody