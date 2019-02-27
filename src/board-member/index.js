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
    InspectorControls, RichText   
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
    'clb-custom-blocks/board-member',
    {
        title: 'Board Member',
        description:  'Add a new board member to the page.',
        category: 'common',
        icon: {
            foreground: '#fff',
            background: '#489163',
            src: icon,
        },
        keywords: [
            'board',
            'member',
            'directors'
        ],
        attributes: {
             name: {
                type: 'string',
                source: 'text',
                selector: '.board-member-name',
             },
             title: {
                type: 'string',
                source: 'text',
                selector: '.board-member-title',
             },
             website: {
                  type: 'string',
                 source: 'text',
                 selector: '.board-member-website',
             },
             bio: {
                 type: 'array',
                 source: 'children',
                 selector: '.board-member-bio-body',
             }
        },

        edit: props => {
            const { attributes: { name, title, website, bio }, className, isSelected, setAttributes } = props;
            const onChangeName = name => { setAttributes( { name } ) };
            const onChangeTitle = title => { setAttributes( { title } ) };
            const onChangeWebsite = website => { setAttributes( { website } ) };
            const onChangeBio = bio => { setAttributes( { bio } ) };

            return (
                <div className={ className }>
                { isSelected ? (
                     <div className ={ className + "-selected" } >
                     <TextControl
                          className='board-member-name-input'
                          label={ 'Name' }
                          value={ name }
                          placeholder={ 'Jane Doe' }
                          onChange={ onChangeName }
                     />
                     <TextControl
                          className='board-member-title-input'
                          label={ 'Title' }
                          value={ title }
                          placeholder={ 'Optional' }
                          onChange={ onChangeTitle }
                     />
                     <TextControl
                          className='board-member-website-input'
                          label={ 'Website' }
                          value={ website }
                          placeholder={ 'Optional' }
                          onChange={ onChangeWebsite }
                     />
                     <h4>Bio</h4>
                    <RichText
                        tagName="div"
                        multiline="p"
                        placeholder={ 'Add your custom bio' }
                  		onChange={ onChangeBio }
                  		value={ bio }
              		/>
                    </div>
               ) : (
                  <div class="static-board-member">
                       <p>Board Member: {name}</p>
                  </div>
               )}
                </div>
            );
        },
        save: props => {
                    const { attributes: { name, title, website, bio } } = props;

                    // let publishedName = name;
                    // if( title ) {
                    //      publishedName = name + ', <span class="board-member-title">' + title + '</span>';
                    // }

                    let boardMemberName = '';

                    if( website ) {
                         boardMemberName = <h4><a href={website} target="_blank" class="board-member-website"><span class="board-member-name">{ name }</span></a>{title && <span>, </span>}<span class="board-member-title">{title}</span></h4>;
                    } else {
                         boardMemberName = <h4><span class="board-member-name">{ name }</span>{title && <span>, </span>}<span class="board-member-title">{title}</span></h4>;
                    }

                    let websitePublish;
                    if( website ) {
                         websitePublish = <a href={website} target="_blank"><span class="board-member-website">{website}</span></a>;
                    } else {
                         websitePublish = <span class="board-member-website">{website}</span>;
                    }

                    return (
                        <div class="board-member-area">
                             <div class="board-member-name-area">
                                 <h2><span class="board-member-name">{ name }</span>{title && <span>, </span>}<span class="board-member-title">{title}</span></h2>
                             </div>
                             <div class="board-member-website-area">
                                 {websitePublish}
                             </div>
                            <div class="board-member-bio-body">
                                { bio }
                            </div>
                        </div>
                    );
                },
    },
);
