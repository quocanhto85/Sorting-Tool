# Sorting Tool
A simple website based on React JS and Node JS, which is used to sort data and sketch graph from data

---
## Installation

### Server side
1. Clone a repository to your computer: `git clone https://github.com/Quocanhtp/sorting-chart-tool.git`
2. Enter folder: `cd sorting-chart-tool`

### Client side
3. Delete the empty client folder
4. Clone a repository to your computer: `git clone https://github.com/Quocanhtp/client.git`
5. Enter folder: `cd client`
6. Install dependencies: `npm install`

## Configuration

### Database
1. In MongoDB clusters, create 2 databases, named `Search` and `User_Info_Chart` 

![db](https://user-images.githubusercontent.com/36063411/104437581-8a2a2900-55c1-11eb-9510-4396c5f42925.PNG)

2. Inside database `Search`, create 2 collections, named `Chart` and `Config`. Likewise, inside database `User_Info_Chart`, create collection `users`

`Chart` and `Config` collection: 

![collections](https://user-images.githubusercontent.com/36063411/104437730-bba2f480-55c1-11eb-8b3c-a65d9ccc6130.PNG)

`Users` collection: 

![users](https://user-images.githubusercontent.com/36063411/104441778-b6947400-55c6-11eb-86de-d869bde2fe00.PNG)
#### Chart
In the `Chart` collection, you can generate the data to be sorted, this includes date, name, and count fields. The image below is a sample of data

![chart](https://user-images.githubusercontent.com/36063411/104439984-5dc3dc00-55c4-11eb-81f5-8b5fc7495aef.PNG)

#### Config
In the `Config` collection, you can classify the name or service of your search by color. In this case, we use hex color code. The image below is a sample of data

![config](https://user-images.githubusercontent.com/36063411/104440334-c9a64480-55c4-11eb-9888-86465b5a3221.PNG)

#### users
In the `Users` collection, we use this collection to save the information of user registration and use them for authentication purpose. The image below is a sample of an user information

![users](https://user-images.githubusercontent.com/36063411/104440500-05d9a500-55c5-11eb-92ac-56f4a0d64acf.PNG)

**Note:** You do not have to use the name I used above, you can config the dababase and collection whatever name you like.
### Server side
You can config the db URI in the config folder

1. Open the `dbSort.js` file and fill your username and password in the MongoURI, you can see the database `Search` that we have already created, which will be used for Sorting purpose. 

![dbSort](https://user-images.githubusercontent.com/36063411/104436200-e2602b80-55bf-11eb-80d7-39e44ae34858.PNG)

2. Open the `dbUser.js` file and fill your username and password in the MongoURI, you can see the database `User_Info_Chart` that we have already created, which will be used for registration and authentication purpose.

![dbUser](https://user-images.githubusercontent.com/36063411/104436251-f60b9200-55bf-11eb-96a3-93ad0399db61.PNG)
## Running the project
1. Open Terminal, and type `npm run dev`, the interface will be displayed like this:

![interface](https://user-images.githubusercontent.com/36063411/104434045-5947f500-55bd-11eb-8035-001cfd40431b.PNG)

2. Enter your user account that already registered and click on the button **Đăng Nhập**, the following interface will be displayed like this:

![3](https://user-images.githubusercontent.com/36063411/90371771-a15bfd80-e099-11ea-90df-7b2db3c5b792.PNG)

You can see the the dropdown label **Chọn Dịch Vụ** at the first item, then the date range picker label **Chọn Thời Gian** at the second, and finally the button **Tìm Kiếm**. When we click the button **Tìm Kiếm**, it will sort based on the service, and the date range we have chosen. 

3. The result will appear as forms of a pagination table and a line graph:

#### Pagination Data Table
![4](https://user-images.githubusercontent.com/36063411/90372491-af5e4e00-e09a-11ea-81c5-79a4d529d783.PNG)

#### Line Graph Data Chart
![5](https://user-images.githubusercontent.com/36063411/90372584-cf8e0d00-e09a-11ea-8d5e-87cf212d008d.PNG)

## License
[MIT](https://choosealicense.com/licenses/mit/)

