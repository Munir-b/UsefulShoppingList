import React, {Component} from 'react'
import Button from './button'

export default class OkButton extends Button {
    getIcon() {
        return ["glyphicon-ok"]
    }
}
