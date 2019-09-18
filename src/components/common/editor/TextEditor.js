// @flow

import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import en from 'react-draft-wysiwyg/src/i18n/en';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import boldIcon from '../../../images/editor_icons/bold.svg';
import italicIcon from '../../../images/editor_icons/italic.svg';
import underlineIcon from '../../../images/editor_icons/underline.svg';
import unorderedIcon from '../../../images/editor_icons/bulleted_list.svg';
import orderedIcon from '../../../images/editor_icons/numbered_list.svg';
import outdentIcon from '../../../images/editor_icons/indent_less.svg';
import indentIcon from '../../../images/editor_icons/indent_more.svg';
import colorPickerIcon from '../../../images/editor_icons/text_color.svg';
import emojiIcon from '../../../images/editor_icons/insert_emoji.svg';
import imageIcon from '../../../images/editor_icons/insert photo.svg';
import linkIcon from '../../../images/editor_icons/attach.svg';
import removeIcon from '../../../images/editor_icons/remove_formatting.svg';
import redoIcon from '../../../images/editor_icons/redo.svg';
import undoIcon from '../../../images/editor_icons/undo.svg';
import editorSr from '../../../locales/sr/editor_sr';
import editorEn from '../../../locales/en/editor_en';

type PropsT = {
	content: Object,
	onEditorChange: Function,
	imageUpload: Function,
};

const TextEditor = (props: PropsT) => {
	const { content, onEditorChange, imageUpload } = props;
	const [editorContent, setEditorContent] = useState(content !== '' ? JSON.parse(content) : '');
	let type = 0;

	const onContentStateChange = changeContent => {
		setEditorContent(changeContent);
		if (type) clearTimeout(type);

		type = setTimeout(() => {
			onEditorChange(changeContent);
		}, 300);
	};

	const LeftSeparator = () => {
		return <div className={'left_separator'} />;
	};

	const RightSeparator = () => {
		return <div className={'right_separator'} />;
	};

	// FIND BETTER SOLUTION
	// en['components.controls.blocktype.normal'] = <span>Paragraph</span>;
	// en['components.controls.blocktype.h7'] = <span>Subtitle</span>;

	const localization = {
		translations: editorEn,
		// translations: editorSr,
	};

	return (
		<Editor
			defaultContentState={editorContent}
			wrapperClassName="overview_editor_wrapper"
			editorClassName="overview_editor"
			toolbarClassName="overview_editor_toolbar"
			onContentStateChange={onContentStateChange}
			toolbarCustomButtons={[<LeftSeparator />, <RightSeparator />]}
			localization={localization}
			toolbar={{
				options: ['blockType', 'history', 'inline', 'colorPicker', 'emoji', 'list', 'link', 'image', 'remove'],
				blockType: {
					options: ['Normal', 'Blockquote'],
					className: 'block-type-option',
					dropdownClassName: 'block-type-dropdown',
				},
				history: {
					inDropdown: false,
					options: ['undo', 'redo'],
					undo: { icon: undoIcon, className: 'option-custom' },
					redo: { icon: redoIcon, className: 'option-custom' },
				},
				inline: {
					options: ['bold', 'italic', 'underline'],
					bold: { icon: boldIcon, className: 'option-custom' },
					italic: { icon: italicIcon, className: 'option-custom' },
					underline: { icon: underlineIcon, className: 'option-custom' },
					inDropdown: false,
				},
				list: {
					unordered: { icon: unorderedIcon, className: 'option-custom' },
					ordered: { icon: orderedIcon, className: 'option-custom' },
					indent: { icon: indentIcon, className: 'option-custom' },
					outdent: { icon: outdentIcon, className: 'option-custom' },
					inDropdown: false,
				},
				colorPicker: { icon: colorPickerIcon, className: 'option-custom' },
				emoji: { icon: emojiIcon, className: 'option-custom' },
				image: {
					icon: imageIcon,
					className: 'option-custom',
					uploadCallback: imageUpload,
					alignmentEnabled: false,
					alt: { present: false, mandatory: false },
					defaultSize: { mandatory: false },
					inputAccept: 'image/jpeg,image/jpg,image/png',
					urlEnabled: false,
					previewImage: true,
				},
				link: {
					options: ['link'],
					link: { icon: linkIcon, className: 'option-custom' },
				},
				remove: { icon: removeIcon, className: 'option-custom remove-icon' },
			}}
		/>
	);
};

export default TextEditor;
