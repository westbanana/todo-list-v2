import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Todo from "../components/Todo/index.jsx";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree/>}>
      <ComponentPreview path="/Todo">
        <Todo/>
      </ComponentPreview>
    </Previews>
  )
}

export default ComponentPreviews