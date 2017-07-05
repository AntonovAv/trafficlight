import {
  CHANGE_NAME, CHANGE_URL, OPEN_DIALOG, CANCEL_EDIT,
} from './constants'

export function openDialogAction(id) {
  return {
    type: OPEN_DIALOG
  }
}

export function closeDialogAction() {
  return {
    type: CANCEL_EDIT
  }
}

export function loadDialogDataAction() {
  return {}
}

export function saveDialogDataAction() {
  return {}
}

export function testTeamcityAction() {
  return {}
}

export function loadBuildTypesAction() {
  return {}
}

export function urlChangeAction(newUrl) {
  return {
    type: CHANGE_URL,
    data: newUrl,
  }
}

export function nameChangeAction(name) {
  return {
    type: CHANGE_NAME,
    data: name,
  }
}
