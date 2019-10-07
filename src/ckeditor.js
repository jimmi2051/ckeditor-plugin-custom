/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import UploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";
import EasyImage from "@ckeditor/ckeditor5-easy-image/src/easyimage";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import Font from "@ckeditor/ckeditor5-font/src/font";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import viewToPlainText from "@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext";
import imageIcon from "@ckeditor/ckeditor5-core/theme/icons/image.svg";
import {
	getData,
	setData
} from "@ckeditor/ckeditor5-engine/src/dev-utils/model";

let viewCode = false;
let backupCode = "";
class ViewSource extends Plugin {
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add("viewSource", locale => {
			const view = new ButtonView(locale);

			view.set({
				label: "View Source",
				icon: imageIcon,
				tooltip: true
			});

			// Callback executed once the image is clicked.
			view.on("execute", () => {
				let dataOfModel = editor.getData();
				let plainText = viewToPlainText(
					editor.editing.view.getDomRoot()
				);
				alert(plainText);
				if (viewCode) {
					// const viewFragment = editor.data.processor.toView(
					// 	dataOfModel
					// );
					// const modelFragment = editor.data.toModel(viewFragment);

					// editor.model.insertContent(modelFragment);
					plainText = plainText.slice(3, plainText.length - 4);
					editor.setData(plainText);
					viewCode = false;
				} else {
					alert("Set data paragraph");
					setData(editor.model, "");
					backupCode = dataOfModel;
					editor.model.change(writer => {
						const insertPosition = editor.model.document.selection.getFirstPosition();
						writer.insertText(dataOfModel, insertPosition);
						viewCode = true;
					});
				}
			});

			return view;
		});
	}
}

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	CKFinder,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	Font,
	ViewSource
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			"heading",
			"|",
			"bold",
			"italic",
			"link",
			"bulletedList",
			"numberedList",
			"imageUpload",
			"blockQuote",
			"insertTable",
			"mediaEmbed",
			"undo",
			"redo",
			"fontSize",
			"fontFamily",
			"fontColor",
			"fontBackgroundColor",
			"viewSource"
		]
	},
	image: {
		toolbar: [
			"imageStyle:full",
			"imageStyle:side",
			"|",
			"imageTextAlternative"
		]
	},
	table: {
		contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: "en"
};
