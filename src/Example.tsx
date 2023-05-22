import { useRef, useState } from 'react';

// react-pintura
import { PinturaEditor } from '@pqina/react-pintura';

// pintura
import '@pqina/pintura/pintura.css';
import {
    // editor
    locale_en_gb,
    createDefaultImageReader,
    createDefaultImageWriter,
    createDefaultShapePreprocessor,

    // plugins
    setPlugins,
    plugin_crop,
    plugin_crop_locale_en_gb,
    plugin_finetune,
    plugin_finetune_locale_en_gb,
    plugin_finetune_defaults,
    plugin_filter,
    plugin_filter_locale_en_gb,
    plugin_filter_defaults,
    plugin_annotate,
    plugin_annotate_locale_en_gb,
    markup_editor_defaults,
    markup_editor_locale_en_gb,
} from '@pqina/pintura';

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

const editorDefaults = {
    imageReader: createDefaultImageReader(),
    imageWriter: createDefaultImageWriter(),
    shapePreprocessor: createDefaultShapePreprocessor(),
    ...plugin_finetune_defaults,
    ...plugin_filter_defaults,
    ...markup_editor_defaults,
    locale: {
        ...locale_en_gb,
        ...plugin_crop_locale_en_gb,
        ...plugin_finetune_locale_en_gb,
        ...plugin_filter_locale_en_gb,
        ...plugin_annotate_locale_en_gb,
        ...markup_editor_locale_en_gb,
    },
};

export default function Example() {
    // inline
    const [result, setResult] = useState('');
    const editorRef = useRef<PinturaEditor>(null);

    return (
        <div className="App">
            <h2>Example</h2>

            <div style={{ height: '70vh' }}>
                <PinturaEditor
                    {...editorDefaults}
                    ref={editorRef}
                    src={'./image.jpeg'}
                    onLoad={(res: any) => {
                        console.log('Did load image', res);

                        // not yet set
                        if (!editorRef.current) return;

                        // Example using editor ref
                        const { editor } = editorRef.current;

                        // Now we can access properties and methods
                        editor.imageCropAspectRatio = 1;
                    }}
                    onProcess={({ dest }: any) => setResult(URL.createObjectURL(dest))}
                />
            </div>

            {!!result.length && (
                <p>
                    <img src={result} alt="" />
                </p>
            )}
        </div>
    );
}
