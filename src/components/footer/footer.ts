import CreateElement from '../../utils/CreateElement';
import rsIco from '../../assets/img/rsIco.png';
import gitIco from '../../assets/img/gitIco.png';
import './footer.css';

export default class Footer {
  render(): HTMLDivElement {
    const footer = CreateElement.createDivElement('footer-wraper');
    const footerIcoContainer = CreateElement.createDivElement('footer-wraper__container');
    const footerText = CreateElement.createParagraphElement(
      'footer-wraper__text',
      '@ 2023 The Rolling Scopes Async Race',
    );
    const footerRSIco = CreateElement.createDivElement('footer__ico');
    const footerRSImg = CreateElement.createImgElement('footer__ico-img', rsIco);
    const footerGitIco = CreateElement.createDivElement('footer__ico');
    const footerGitImg = CreateElement.createImgElement('footer__ico-img', gitIco);
    footerRSIco.append(footerRSImg);
    footerGitIco.append(footerGitImg);
    footerRSIco.addEventListener('click', () => { window.location.href = 'https://rs.school/'; });
    footerGitIco.addEventListener('click', () => { window.location.href = 'https://github.com/andreiChabatul'; });
    footerIcoContainer.append(footerRSIco, footerGitIco);
    footer.append(footerText, footerIcoContainer);
    return footer;
  }
}
