import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
class Ck extends Component {

    render() {
      
        return (
            <div className="App" style = {{overflow:"hidden"}}>
                <CKEditor
                    config={{
                        ckfinder: {
                          // Upload the images to the server using the CKFinder QuickUpload command.
                          uploadUrl: "/up/uploads/",
                          options: {
                            resourceType: "Images",
                          },
                          headers: {
                            'Authentication':"JWT "+ localStorage.getItem("jwt") ,
                      
                        }
                        }}}
                    editor={ ClassicEditor }
                    data="hello from Deming Dev"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.props.handlecontent(data);
                    } }
              
                />
            </div>
        );
    }
}

export default Ck;