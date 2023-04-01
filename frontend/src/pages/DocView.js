import React from 'react'
import { useLocation } from 'react-router-dom'
import DocViewer from "@cyntler/react-doc-viewer";

const DocView = () => {
    const location = useLocation();
    const documents = location?.state?.documents;
    var docs = [];
    for (let i = 0; i < documents.length; i++) {
        docs.push({ uri: `http://localhost:5000/document/${documents[i]}` })
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <DocViewer
                            documents={docs}
                            config={{
                                header: { 
                                    disableFileName: true,
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DocView