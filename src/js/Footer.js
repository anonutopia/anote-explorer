import React from 'react';

const socialLinks = [{
    id: 'github',
    url: 'https://github.com/anonutopia/'
}, {
    id: 'telegram',
    url: 'https://t.me/anotedigital'
}, {
    id: 'facebook',
    url: 'https://www.facebook.com/anonutopia'
}];

const Footer = ({version}) => {
    return (
        <div className="menu-footer">
            <div>Version: {version}</div>
            <div>Brought to you by Anote Team</div>
            <div>
                {socialLinks.map(item =>
                    (<a key={item.id} className={`social ${item.id}`} href={item.url} target="_blank"></a>))}
            </div>
            <div>
                <a className="fade" href="https://anote.digital/" target="_blank">anote.digital</a>
            </div>
        </div>
    );
}

export default Footer;
