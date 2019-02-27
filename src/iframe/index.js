/**
 * Block dependencies
 */
//import classnames from 'classnames';
import icon from './icon';
import './style.css';
import './editor.css';

/**
 * Internal block libraries
 */

const { Fragment } = wp.element;
const {
    registerBlockType,
} = wp.blocks;
const {
    InspectorControls,
} = wp.editor;
const {
     Toolbar,
    Button,
    Tooltip,
    PanelBody,
    PanelRow,
    FormToggle,
    TextControl,
    IconButton,
    RangeControl,
} = wp.components;


/**
 * Register example block
 */
export default registerBlockType(
    'custom-blocks/iframe',
    {
        title: 'iFrame Embed',
        description:  'Embed an iFrame into your content.',
        category: 'common',
        icon: {
            foreground: '#fff',
            background: '#489163',
            src: icon,
        },
        keywords: [
            'iFrame',
            'embed',
        ],
        attributes: {
            text: {
                type: 'string',
                source: 'text',
                selector: 'a',
            },
            url: {
                type: 'string',
                source: 'attribute',
                attribute: 'href',
                selector: 'a',
            },
            fullWidth: {
                type: 'boolean',
                default: true,
            },
            widthInPixels: {
                type: 'number',
                default: 300,
            },
            heightInPixels: {
                type: 'number',
                default: 400,
            },
            iframeBorder: {
                type: 'boolean',
                default: false,
            },
        },
        edit: props => {
            const { attributes: { text, url, fullWidth, iframeBorder, widthInPixels, heightInPixels },
                className, isSelected, setAttributes } = props;
           const togglefullWidth = () => setAttributes( { fullWidth: ! fullWidth } );
           const toggleiframeBorder = () => setAttributes( { iframeBorder: ! iframeBorder } );

                return [
                     <InspectorControls>
                         <PanelBody
                            title={ 'iFrame Settings' }
                         >
                            <PanelRow>
                                <label
                                     htmlFor="full-width-form-toggle"
                                >
                                     { 'Full Width (takes precedence)' }
                                </label>
                                <FormToggle
                                     id="full-width-form-toggle"
                                     label={ 'Full Width (takes precedence)' }
                                     checked={ fullWidth }
                                     onChange={ togglefullWidth }
                                />
                            </PanelRow>
                            <PanelBody>
                               <RangeControl
                                   beforeIcon="arrow-left-alt2"
                                   afterIcon="arrow-right-alt2"
                                   label={ 'Width in Pixels' }
                                   value={ widthInPixels }
                                   onChange={ widthInPixels => setAttributes( { widthInPixels } ) }
                                   min={ 100 }
                                   max={ 1200 }
                               />
                           </PanelBody>
                           <PanelBody>
                              <RangeControl
                                  beforeIcon="arrow-left-alt2"
                                  afterIcon="arrow-right-alt2"
                                  label={ 'Height in Pixels' }
                                  value={ heightInPixels }
                                  onChange={ heightInPixels => setAttributes( { heightInPixels } ) }
                                  min={ 100 }
                                  max={ 1200 }
                              />
                          </PanelBody>
                            <PanelRow>
                                <label
                                     htmlFor="border-form-toggle"
                                >
                                     { 'Border' }
                                </label>
                                <FormToggle
                                     id="border-form-toggle"
                                     label={ 'Border' }
                                     checked={ iframeBorder }
                                     onChange={ toggleiframeBorder }
                                />
                            </PanelRow>
                         </PanelBody>
                     </InspectorControls>,

                     <div className="clb-iframe-wrapper">
                        { isSelected ? (
                        <div className={ className + ' selected' }>
                           <Fragment>
                               <TextControl
                                    id="clb-iframe-title-input"
                                    label={ 'iFrame Source Title' }
                                    value={ text }
                                    placeholder={ 'Durham Neighborhood Compass' }
                                    onChange={ text => setAttributes( { text } ) }
                               />
                               <TextControl
                                    id="clb-iframe-URL-input"
                                    label={ 'iFrame Source URL' }
                                    value={ url }
                                    placeholder={ 'https://compass.durhamnc.gov' }
                                    onChange={ url => setAttributes( { url } ) }
                               />
                           </Fragment>
                           </div>
                        ) : (
                           <div className={ className + ' static' }>
                           <div className="clb-iframe-placeholder-area">
                           </div>
                           <p>{ 'iFrame: ' + text || 'Edit iFrame' }</p>
                           </div>
                        )}
                        </div>
                ];
        },
        save: props => {
            const { attributes: { text, url, fullWidth, iframeBorder, widthInPixels, heightInPixels } } = props;
            let titleText = text;

                 function slugify(string)
                    {
                      return string.toString().toLowerCase()
                        .replace(/\s+/g, '-')           // Replace spaces with -
                        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                        .replace(/^-+/, '')             // Trim - from start of text
                        .replace(/-+$/, '');            // Trim - from end of text
                    }

          if( !titleText ) { titleText = ''; }
          let slugText = slugify(titleText);

          let width = widthInPixels;
          if( fullWidth ) { width = "100%"; }

          let border = 0;
          if( iframeBorder ) { border = 1 }

            return (
                 <div className="clb-custom-iframe">
                     <p>
                     <iframe id = {'iframe-' + slugText}
                         title = {titleText}
                         width = {width}
                         height = {heightInPixels}
                         frameborder = {border}
                         src = {url} >
                         </iframe>
                    </p>
                    <p><div class="iframe-source">Source: <a href={url} target="_blank">{titleText}</a></div></p>
               </div>
            );
        },
    },
);
