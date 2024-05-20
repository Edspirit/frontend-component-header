import arMessages from './messages/ar.json';
import faIRMessages from './messages/fa_IR.json';
// no need to import en messages-- they are in the defaultMessage field
import es419Messages from './messages/es_419.json';
import frMessages from './messages/fr.json';
import zhcnMessages from './messages/zh_CN.json';
import ruMessages from './messages/ru.json';
import ukMessages from './messages/uk.json';
import ptMessages from './messages/pt.json';
import itMessages from './messages/it.json';
import deMessages from './messages/de.json';
import hiMessages from './messages/hi.json';
import frcaMessages from './messages/fr_CA.json';
import ititMessages from './messages/it_IT.json';
import ptptMessages from './messages/pt_PT.json';
import dedeMessages from './messages/de_DE.json';
import zhhkMessages from './messages/zh_HK.json';

const messages = {
  ar: arMessages,
  'fa-ir': faIRMessages,
  fa: faIRMessages,
  'es-419': es419Messages,
  fr: frMessages,
  'zh-cn': zhcnMessages,
  'zh-hk': zhhkMessages,
  ru: ruMessages,
  uk: ukMessages,
  pt: ptMessages,
  it: itMessages,
  de: deMessages,
  hi: hiMessages,
  'fr-ca': frcaMessages,
  'it-it': ititMessages,
  'pt-pt': ptptMessages,
  'de-de': dedeMessages,
};

export default messages;
