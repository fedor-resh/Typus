import React, {useState} from 'react';
import s from './Footer.module.css'
import {ReactComponent as Mail} from '../../svg/mail.svg';
import {ReactComponent as Code} from '../../svg/code.svg';
import {ReactComponent as Materials} from '../../svg/materials.svg';
import {ReactComponent as Discord} from '../../svg/discord-svgrepo-com.svg';
import ThemesList from '../ThemesList/ThemesList';


const Footer = () => {
    const [isThemeListOpen,setIsThemeListOpen] = useState(false)
    const MemoThemeList = React.memo(ThemesList)
    return (
        <footer className={s.footer}>
            <a target='_blank' href="https://discord.gg/rpHdf6BHzq">
                <div className={s.code__wrapper}>
                    <Discord/>
                    <p>discord</p>
                </div>
            </a>
            <a target='_blank' href="mailto:fedor_20052005@mail.ru">
                <div className={s.mail__wrapper}>
                    <Mail/>
                    <p>contacts</p>
                </div>
            </a>
            <a target='_blank' href="https://github.com/fedor-resh/react-keyboard-runner">
                <div className={s.code__wrapper}>
                    <Code/>
                    <p>github</p>
                </div>
            </a>

            <div onClick={()=>setIsThemeListOpen(true)} className={s.materials__wrapper}>
                <Materials className={s.materials}/>
                <p>materials</p>
            </div>
            {/*<ThemesList onClose={()=>setIsThemeListOpen(false)}/>*/}
            {isThemeListOpen&&<MemoThemeList onClose={()=>setIsThemeListOpen(false)}/>}

        </footer>
    );
};

export default Footer;