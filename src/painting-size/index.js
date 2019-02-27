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
    'clb-custom-blocks/painting-size',
    {
        title: 'Painting Size',
        description:  'Specify the size of your painting.',
        category: 'common',
        icon: {
            foreground: '#fff',
            background: '#489163',
            src: icon,
        },
        keywords: [
            'painting',
            'size',
            'canvas'
        ],
        attributes: {
            height: {
               type: 'string',
               source: 'text',
               selector: '#clb-painting-size-height-input',
               // type: 'string',
               // source: 'meta',
               // meta: 'painting_size_height',
            },
            width: {
                type: 'string',
                source: 'text',
                selector: '#clb-painting-size-width-input',
                // type: 'string',
                // source: 'meta',
                // meta: 'painting_size_width',
            },
        },

        edit: props => {
            const { attributes: { height, width },
                className, isSelected, setAttributes } = props;

           console.log('Height: ' + height);
           console.log('Width: ' + width);

           const onChangeHeight = height => { setAttributes( { height } ) };
           const onChangeWidth = width => { setAttributes( { width } ) };

                return (
                     <div className="clb-painting-size-wrapper">
                        { isSelected ? (
                        <div className={ className + ' selected' }>
                           <Fragment>
                               <TextControl
                                    id='clb-painting-size-height-input'
                                    label={ 'Height in inches' }
                                    value={ height }
                                    placeholder={ '12' }
                                    onChange={ onChangeHeight }
                               />
                               <TextControl
                                    id='clb-painting-size-width-input'
                                    label={ 'Width in inches' }
                                    value={ width }
                                    placeholder={ '12' }
                                    onChange={ onChangeWidth }
                               />
                           </Fragment>
                           </div>
                        ) : (
                           <div className={ className + ' static' }>
                                <p>Dimensions: {height}&#x201D; high x {width}&#x201D; wide</p>
                           </div>
                        )}
                        </div>
                );
        },
        save: props => {
            const { attributes: { height, width } } = props;

            console.log('Saved Height: ' + height);
           console.log('Saved Width: ' + width);

            return (
                 <div className="clb-custom-painting-size">
                     <p>Dimensions: <span id="clb-painting-size-height-input">{height}</span>&#x201D; high x <span id="clb-painting-size-width-input">{width}</span>&#x201D; wide</p>
                 </div>
            );
        },
    },
);
