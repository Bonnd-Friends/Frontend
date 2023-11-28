import React from 'react'
import { useGlobalContext } from '../../context'

import Explore from '../../Components/App/Explore'

const AppBody = () => {
  const {navTab} = useGlobalContext()

  if(navTab == "Explore"){
    return <Explore />
  }
  if(navTab == "Profile"){
    return <div>Profile</div>
  }
  if(navTab == "Matches"){
    return <div>Matches</div>
  }
}

export default AppBody