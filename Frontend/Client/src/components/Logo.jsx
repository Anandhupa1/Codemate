import {Box,Image} from "@chakra-ui/react"
import image from "../images/Logo.png"
import React from 'react'

function Logo({width}) {
    if(!width){width="150px"}
  return (
    <Box width={width}> <Image src={image}/></Box>
  )
}

export default Logo
