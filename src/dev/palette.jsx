import React from "react"
import {Fragment} from "react"
import {
  Category,
  Component,
  Variant,
  Palette,
} from "@react-buddy/ide-toolbox"
import AddTodoButton from "../components/AddTodoButton/index.jsx";

export const PaletteTree = () => (
  <Palette>
    <Category name="App">
      <Component name="Loader">
        <Variant>
          <ExampleLoaderComponent/>
        </Variant>
      </Component>
      <Component name="Btn component">
        <Variant name="AddTodoButton" requiredParams={['data']}>
          <AddTodoButton />
        </Variant>
        <Variant name="DeleTodoBtn" requiredParams={['data']}>
          <AddTodoButton />
        </Variant>
      </Component>
    </Category>
  </Palette>
)

export function ExampleLoaderComponent() {
  return (
    <Fragment>Loading...</Fragment>
  )
}