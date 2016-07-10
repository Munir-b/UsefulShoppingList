import React, {Component} from 'react'
import Button from './button'

export default class EditButton extends Button {
    getIcon() {
        return ["glyphicon-pencil"]
    }
}
