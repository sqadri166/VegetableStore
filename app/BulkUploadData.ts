export class BulkUpload 
{
    
    admin:any;
    serviceAccount:any;
    db:any;
    credential:any;
    databaseURL:any;

    BulkUpload()
    {
        this.admin = require('firebase-admin');
 
        this.serviceAccount = require('path/to/serviceAccountKey.json');
        this.credential =  this.admin.credential.cert(this.serviceAccount),
        this.databaseURL = "https://bluerolesclaims.firebaseio.com"
        this.admin.initializeApp({
            credential: this.admin.credential.cert(this.serviceAccount),
            databaseURL: "https://bluerolesclaims.firebaseio.com"
          });
          this.db = this.admin.firestore();




    }
    
   
       UploadData:any = async (contextData:any) => {
       
        var uploaded:Boolean;
        try 
        {
        const batch = this.db.batch();

        contextData.forEach((item:any) => {
          const docRef = this.db.collection('Products').doc(); // Auto-generated ID
          batch.set(docRef, item);
        });
      
        await batch.commit();
        uploaded = true;
        console.log('Data uploaded successfully!');
        }
        catch(err)
        {
            uploaded = false;
        }
         return uploaded ;
    
    
}
    
        
}

