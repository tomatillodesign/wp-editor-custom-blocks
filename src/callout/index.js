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
    InspectorControls, RichText, PanelColorSettings,
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
    RadioControl,
    ColorPalette,
} = wp.components;


/**
 * Register example block
 */
export default registerBlockType(
    'clb-custom-blocks/callout',
    {
        title: 'Callout',
        description:  'Create a callout box that has different styling on the page.',
        category: 'common',
        icon: {
            foreground: '#fff',
            background: '#489163',
            src: icon,
        },
        keywords: [
            'call',
            'quote',
            'highlight'
        ],
        attributes: {
             title: {
                type: 'string',
                source: 'text',
                selector: '.callout-heading',
             },
            content: {
                type: 'array',
                source: 'children',
                selector: '.callout-body',
             },
             backgroundColor: {
                  type: 'string',
                  default: '#ddd'
             },
             side: {
                  type: 'string',
                  default: 'right'
             },
             icon: {
                  type: 'string',
                  default: 'lightbulb-on'
             },
        },

        edit: props => {
            const { attributes: { title, content, backgroundColor, side, icon }, className, isSelected, setAttributes } = props;
            const onChangeTitle = title => { setAttributes( { title } ) };
            const onChangeContent = content => { setAttributes( { content } ) };
            const onChangeIcon = icon => { setAttributes( { icon } ) };

            return [
                 <InspectorControls>
                    <PanelBody
                       title={ 'Callout Settings' }
                    >
                    <TextControl
                        label={ 'Icon' }
                        help={ 'Copy the icon text from fontawesome.com/icons. Eg: lightbulb-on' }
                        value={ icon }
                        onChange={ onChangeIcon }
                    />
                    <RadioControl
                         label="Where should the callout appear?"
                         selected={ side }
                         options={ [
                             { label: 'Left', value: 'left' },
                             { label: 'Right', value: 'right' },
                             { label: 'Full', value: 'full' },
                         ] }
                         onChange={ side => setAttributes( { side } ) }
                     />
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
                     <div className ={ className + "-selected" } >
                          <TextControl
                               className='callout-heading'
                               label={ 'Heading' }
                               value={ title }
                               placeholder={ 'Callout Header' }
                               onChange={ onChangeTitle }
                          />
                         <RichText
                             tagName="div"
                             multiline="p"
                             placeholder={ 'Your callout content here...' }
                       		onChange={ onChangeContent }
                       		value={ content }
                   		/>
                    </div>
               ) : (
                  <div class="callout-static" style={ { backgroundColor: backgroundColor } }>
                       <h3>Callout Box: {title}</h3>
                  </div>
               )}
                </div>
           ];
        },
        save: props => {
                    const { attributes: { title, content, backgroundColor, side, icon } } = props;

                    return (
                         <div className={ `clb-callout-area ${side}` } style={ { backgroundColor: backgroundColor } }>
                              <span className="callout-icon"><i className={ `fal fa-${icon} fa-lg` }></i></span> <h3 className="callout-heading">{title}</h3>
                               <div className="callout-body">{content}</div>
                         </div>
                    );
                },
    },
);
