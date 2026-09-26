import mongoose from 'mongoose'



/* Under the userSchema we create two object 
        {One is for user all information .l....}
        {Other one is for when the user is created} 
        */





const birthdayMessageSchema  = new mongoose.Schema( {
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  } );


const BirthdayMessage  = mongoose.model("BirthdayMessage", birthdayMessageSchema ) || mongoose.models.User ;

export default BirthdayMessage ;