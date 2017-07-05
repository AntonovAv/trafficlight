import {selectSettings} from '../selectors'
import {createSelector} from 'reselect'

export const selectDialogData = createSelector(
  [selectSettings],
  (s) => s.editDialog
)
