import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const DocView = () => {
    // const navigate = useNavigate();
    const location = useLocation();
    const documents = location?.state?.documents;
    var docs = [];
    for (let i = 0; i < documents.length; i++) {
        docs.push({ uri: `http://localhost:5000/document/${documents[i]}` })
        console.log(docs);
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <DocViewer
                            documents={docs}
                           
                            
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DocView