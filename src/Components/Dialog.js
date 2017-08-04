import React, { Component } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

class Dialog extends Component {

  handleModalClose(event){
    if(event.target.id === "saveButton"){
      document.getElementById('formSubmit').click();
    }
    this.props.modalClose(true);  
  }

  handleAddItem(){
    
  }

  handleUpdateItems(){
    
  }

  handleUpdateBucket(){
    
  }
  
  handleContent(){
    if(this.props.content['content'] === "addItemField"){
      return (
        <Form id="form" onSubmit={this.handleAddItem.bind(this)}>
            <div>
                <Form.Field>
                 <input type="text" ref="itemName" placeholder="Item Name" />
                 <Button id="formSubmit" style={{'display':'none'}} primary type="submit">Delete</Button>
                </Form.Field>
            </div>
        </Form>
      )
    }else if(this.props.content['content'] === "updateBucketField"){
      return (
        <Form onSubmit={this.handleUpdateBucket.bind(this)}>
            <div>
                <Form.Field>
                 <input type="text" ref="bucketName" placeholder="Bucket List Name" />
                 <Button id="formSubmit" style={{'display':'none'}} primary type="submit">Delete</Button>
                </Form.Field>
            </div>
        </Form>
      )
    }else{
      return (
        <Form onSubmit={this.handleUpdateItems.bind(this)}>
            <div>
                <Form.Field>
                 <input style={{'width':'40%'}} type="text" />
                 <input style={{'marginLeft':'10%', 'zoom': '2'}} type="checkbox" /> Done
                 <Button style={{'marginLeft':'10%'}}>Delete</Button>
                 <Button id="formSubmit" style={{'display':'none'}} primary type="submit">Delete</Button>
                </Form.Field>
            </div>
        </Form>
      )
    }
  }

  render() {

    return (
      <div>

        <Modal size={this.props.size} open={this.props.open} onClose={this.handleModalClose.bind(this)}>
          <Modal.Header>{this.props.header}</Modal.Header>
          <Modal.Content scrolling>
            <Modal.Description>
              <div>{this.handleContent()}</div>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button id="closeButton" color='black' onClick={this.handleModalClose.bind(this)}>Cancel</Button>
            <Button id="saveButton" positive icon='checkmark' labelPosition='right' content="Save" onClick={this.handleModalClose.bind(this)} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default Dialog
