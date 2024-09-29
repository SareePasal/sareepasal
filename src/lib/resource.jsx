import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc'
import { components } from './component';
const { google } = require('googleapis');

const credential =  JSON.parse(atob(process.env.GOOGLE_SERVICE_KEY))

export async function getAllResourcesID(location){
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credential.client_email,
      private_key: credential.private_key,
    },
    scopes: 'https://www.googleapis.com/auth/drive.metadata.readonly',
  })
  const client = google.drive({version: "v3", auth: auth})
  const res = await client.files.list({
    q: `'${location}' in parents and trashed=false`
  })
  const resourcesRemoved = res.data.files.filter((name)=>name.name != "Resources")
  return resourcesRemoved.map((name) =>{
    return {
      params: {
        documentId: name.id,
    },
  }
});
}


function getDocValue(response,title,location, month,year,sheetId){
  // console.log(response,title,location, month,year,sheetId)
  let startingPoint = response.filter((name) => response.indexOf(name) > 9)
  const rowRegular = [
    'Description',
    'Receipt Number',
    'Income (Cash)',
    'Income (Cheque)',
    'Expenses'
  ]
  const rowBank = ['Description','Begining Balance','Deposit','Withdraw','Ending Balance']
  const content = startingPoint.map((value => 
      {
        let totalItems = ["", "", "" ,"" ,""]
        value.map((item,index)=>{
              totalItems[index] = item
        })
      return totalItems
    }
  ))
  return ({
    title : title,
    rowHeading: rowRegular,
    content: content,
    location: location,
    balanceHeading: rowBank,
    month: month,
    year: year,
    sheetId: sheetId
  })
}


export async function getFinancialDocs(location){
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credential.client_email,
      private_key: credential.private_key,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
  const client = google.sheets({version: "v4", auth: auth})
  const res = await client.spreadsheets.get({
    spreadsheetId: location,
  });
  const fullTitle = res.data.properties.title
  if (fullTitle.includes("Bank Statement")){
    const found = fullTitle.match(/^(\w*)\s(\d*)\s.*-\s.*Bank Statement/)
    const month = found[1]
    const year = found[2]
    const sheetsFiltered = res.data.sheets.filter((_,index) => index < 3)
    const totalValue =  await Promise.all(sheetsFiltered.map(async (item) => {
      const value = await client.spreadsheets.values.get({
      spreadsheetId: location,
        range: `${item.properties.title}!A1:E86`
      });
      return getDocValue(value.data.values, item.properties.title, location, month,year,item.properties.sheetId)
    })
    )
    return totalValue
  }
  const title = res.data.sheets[0].properties.title
  const value = await client.spreadsheets.values.get({
  spreadsheetId: location,
    range: `${title}!A1:E86`
  });

return getDocValue(value.data.values, title, location, "", "", 0)
}


export async function getAllFinances(location){
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credential.client_email,
      private_key: credential.private_key,
    },
    scopes: 'https://www.googleapis.com/auth/drive.metadata.readonly',
  })
  const client = google.drive({version: "v3", auth: auth})
  const res = await client.files.list({
    files: location
  })
  const resourcesRemoved = res.data.files.filter((name)=>name.mimeType == "application/vnd.google-apps.spreadsheet")
  return resourcesRemoved.map((name) =>{
    return {
      params: {
        documentId: name.id,
    },
  }
});
}


export async function getAllResources(location){
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credential.client_email,
      private_key: credential.private_key,
    },
    scopes: 'https://www.googleapis.com/auth/drive.metadata.readonly',
  })
  const client = google.drive({version: "v3", auth: auth})
  const res = await client.files.list({
    files: location
  })
  const resourcesRemoved = res.data.files.filter((name)=>name.name != "Resources")
  return resourcesRemoved.map((name) =>{
    return {
      params: {
        id: name.name.replace(/\.md$/, ''),
    },
  }
});
}

export async function googleDocsGet(id) {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: credential.client_email,
        private_key: credential.private_key,
      },
      scopes: ['https://www.googleapis.com/auth/documents'],
    })
    const client = google.docs({version: "v1", auth: auth})
    const res = await client.documents.get({
      documentId: id,
    });

    const contents = res.data.body.content.filter(value => value.paragraph != undefined)
    const text = contents.reduce((fullContent, value)=>{
      return (
        fullContent += value.paragraph.elements.reduce((joinText,element)=>{
          return (
            joinText += Buffer.from(element.textRun.content).toString()
          )
        },"")
      )
    },"")
    const {data, content} = matter(Buffer.from(text).toString());
    const contentRd = <MDXRemote source={content} components={components}/>
    return {
      id,
      contentRd,
      content,
      ...data,
    };
  }
