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
    //InspectorControls, RichText, ColorPalette,
    InspectorControls, RichText, PanelColorSettings
} = wp.editor;
const {
     Toolbar,
    Button,
    Tooltip,
    PanelBody,
    PanelColor,
    PanelRow,
    FormToggle,
    TextControl,
    IconButton,
    RangeControl,
    ColorPalette,
} = wp.components;


/**
 * Register example block
 */
export default registerBlockType(
    'clb-custom-blocks/collapse',
    {
        title: 'Collapse',
        description:  'Create a collapsible section on the page.',
        category: 'common',
        icon: {
            foreground: '#fff',
            background: '#489163',
            src: icon,
        },
        keywords: [
            'collapsing',
            'toggle',
            'bootstrap'
        ],
        attributes: {
             title: {
                type: 'string',
                source: 'text',
                selector: '.collapse-title-input',
             },
             content: {
                 type: 'array',
                 source: 'children',
                 selector: '.collapse-content-body',
            },
             backgroundColor: {
                  type: 'string',
                  default: '#333333'
             },
             titleID: {
                  type: 'string'
             }
        },

        edit: props => {
            const { attributes: { title, content, backgroundColor, titleID }, className, isSelected, setAttributes } = props;
            const onChangeTitle = title => { setAttributes( { title } ) };
            const onChangeContent = content => { setAttributes( { content } ) };

            function slugify(text) {
                if( !text ) { return ''; }
                   return text.toString().toLowerCase()
                    .replace(/\s+/g, '-')           // Replace spaces with -
                    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                    .replace(/^-+/, '')             // Trim - from start of text
                    .replace(/-+$/, '');            // Trim - from end of text
                 }

            const setTitleID = titleID => { setAttributes( { titleID : slugify(title) } ) };
             //titleID = Math.round((Math.random()*10000000));

             //let titleID = slugify(title);
             setTitleID();

            return [
                 <InspectorControls>
                    <PanelBody
                       title={ 'Collapse Settings' }
                    >
                    <PanelColorSettings
                         title={'Background Color'}
                         colorValue={ backgroundColor }
                     >
                         <ColorPalette
                             value={ backgroundColor }
                             onChange={ backgroundColor => setAttributes( { backgroundColor } ) }
                         />
                     </PanelColorSettings>
                     <PanelColorSettings
                         title={'Background Color'}
                         colorSettings={[
                           {
                             label: "Color Picker",
                             value: backgroundColor,
                             onChange: backgroundColor => {
                               setAttributes({ backgroundColor });
                             }
                           }
                         ]}
                       />
                    </PanelBody>
                 </InspectorControls>,

                <div className={ className } >
                { isSelected ? (
                     <div className ={ className + "-selected" } style={ { borderLeft: '8px solid transparent',
                                                            borderLeftColor: backgroundColor,
                                                            paddingLeft: '16px'
                                                            } }>
                     <TextControl
                          className='collapse-title-input'
                          label={ 'Title' }
                          value={ title }
                          placeholder={ 'Collapsible Button Title' }
                          onChange={ onChangeTitle }
                     />
                     <RichText
                         tagName="div"
                         multiline="p"
                         placeholder={ 'Your content here...' }
                   		onChange={ onChangeContent }
                   		value={ content }
               		/>
                    </div>
               ) : (
                  <div class="collapse-static" style={ { backgroundColor: backgroundColor } }>
                       <p>{title} <span class="dashicons dashicons-arrow-down-alt2"></span></p>
                  </div>
               )}
                </div>
           ];
        },
        save: props => {
                    const { attributes: { title, content, backgroundColor, titleID } } = props;

                    // function slugify(text) {
                    //      if(!text) { return; }
                    //        return text.toString().toLowerCase()
                    //          .replace(/\s+/g, '-')           // Replace spaces with -
                    //          .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                    //          .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                    //          .replace(/^-+/, '')             // Trim - from start of text
                    //          .replace(/-+$/, '');            // Trim - from end of text
                    //      }

                         //let titleID = slugify(title) + '-' + Math.round((Math.random()*10000000));
                         //let titleID = Math.round((Math.random()*10000000));

                    return (
                         <div class="clb-collapse-area">
                         <a class="collapse-section collapsed" data-toggle="collapse" href={"#" + titleID} aria-expanded="false" aria-controls="button-title-here">
                         <div class="collapse-button-area" style={ {backgroundColor: backgroundColor} }><div className="collapse-title-input">{title}</div><span class="dashicons down dashicons-arrow-down-alt2"></span><span class="dashicons up dashicons-arrow-up-alt2"></span></div></a>
                              <div class="collapse" id={titleID}>
                                   <div class="collapse-text collapse-content-body">
                                        {content}
                                   </div>
                              </div>
                         </div>
                    );
                },
    },
);
