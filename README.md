# LHosting

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/LaurensHolthof/LHosting.svg)](https://github.com/LaurensHolthof/LHosting/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/LaurensHolthof/LHosting.svg)](https://github.com/LaurensHolthof/LHosting/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/LaurensHolthof/LHosting.svg)](https://github.com/LaurensHolthof/LHosting/issues)

## Description

This project is a little file hosting/sharing platform, made as both a passion project and as an easy way to share and host files for me and my friends.
It's insecure and definitely subject to a lot of change, but this is my first actual project :). If you find a vulnerability, I'm probably aware of it and not planning on fixing it.
This isn't a high-security application, and there's about a thousand ways to exploit it.

## Table of Contents

- [Usage](#usage)
- [File Structure](#file-Structure)
- [How to Dost](#How-to-Host) 
- [Todo](#todo)

## Usage

To upload files, drag them into the upload zone on the upload page, or click the rectangle and select the files you want to upload. A green bar will indicate upload progress. To open a file, click its name in the file explorer. Downloading is done with the download button and deletion is done with the... deletion button. Rocket science, I know. 

## File Structure

There are three webpages, four script files, and one style document.
The three pages share the js file, and the php files are used by the backend to handle file storage, lookup, and deletion on the server.
The file explorer uses js to dynamically draw the table of items stored on the server. 
Missing are a htaccess file and the files folder, as those are irrelevant in the github project.

## How to Host

Step 1: 
Run `git clone https://github.com/LaurensHolthof/LHosting` in the directory you want to host the site. 

Step 2: 
Create a files directory in that same directory. To achieve this you can run `mkdir files`.

Step 3 (optional):
Create a .htaccess file that sets the DirectoryIndex of the files directory to something that isn't index.html, this can be gibberish.

Step 4:
Start the php/apache server. 


## Todo

- Dark mode
- Make the file explorer support directories
