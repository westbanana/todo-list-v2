import {useDispatch} from "react-redux";
import {useMemo} from "react";
import {bindActionCreators} from "@reduxjs/toolkit"
import {actions as actionsBg} from "../store/backgroundReducer.js";
import {actions as actionsColumn} from "../store/columnsReducer.js";

const rootActions = {
  ...actionsBg,
  ...actionsColumn
}
export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() =>
    bindActionCreators(
      rootActions,
      dispatch
    ), [dispatch])
};
