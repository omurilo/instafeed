# Reproduction of Instagram Feed

  - The objective of repository is enhancement my abilities of prototyping apps in react native, with animations and advanced work with images.

# Instructions

  - First steps for test my app:
    - Add one server for distribute informations of posts. In my case i used json-server and an archive called server.json with one list of posts and authors. (bellow instructions for make this):
    ```bash
      yarn global add json-server
      or
      yarn add -D json-server
    ```
    and
    ```bash
      json-server src/services/api/server.json -d 1000 -w
      // -d apply delay with 1ms in response
      // -w apply watch for changes in archive json;
    ```
    ***
    <center>Made with :heart: by Murilo and inspired in Diego Fernandes @ Rocketseat</center>
