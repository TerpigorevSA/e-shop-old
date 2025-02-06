import React from "react"
import style from './Loader.module.css'

export const Loader = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.spinner}></div>
        </div>
    )
}