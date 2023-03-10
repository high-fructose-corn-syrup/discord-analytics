# discord-analytics
List of my tools used for fun analytics. 

Ever wanted to see which of your friends is the most popular? Or perhaps you wonder who is the most active? These are simple questions you can answer with this tool. 
![image](https://user-images.githubusercontent.com/107040758/210154989-0eb72f02-ffd1-4fb2-8ee6-50cc839ba3af.png)
![image](https://user-images.githubusercontent.com/107040758/210155007-379779e7-d6fb-4105-8784-08ace9dc21e4.png)
![image](https://user-images.githubusercontent.com/107040758/210155032-be604884-9fdc-4cc2-a9cc-e1a1a0c3d291.png)
![image](https://user-images.githubusercontent.com/107040758/210155038-8d90e9b7-661e-42ac-b61b-cfa0c8a03a23.png)
![image](https://user-images.githubusercontent.com/107040758/210155042-45530325-b27f-48af-8b7b-101a163b6a67.png)

## Usage

### Collecting
Create a file in the directory. Name it whatever you like&mdash;I prefer to use `user.key`. Inside this file you put your Discord authorization bearer.
Then just run the collector from the directory with: 

`node runners/history "user.key" "channel_id=CHANNEL_ID"`

Inside the "logs" directory will be a file named "master.csv" which contains the messages you've collected. It only contains the information such as the message's id and the author's id. The message id is a snowflake which can uniquely identify each message. For this scenario I turn the id (knwon as a snowflake) into a timestamp as it bears that information too. 

### Reports
Uses Jupytr notebook. The environment I prefer is Visual Studio Code because I often work along side the other code such as the collecting code. The only reason this is a notebook to begin with is to create a simple distributable with all of the code in one centralized place.

Inside `tz_str` you can create a dictionary of your friend's timezones. If you don't do so then the format for a specific section of the code will just use GMT+0.

Throughout the codebase is also commented lines which generally identify usages. The code is fairly messy. 


### Contribution
Got ideas? Make an issue. 
