Hi alex, you are probably silly and not computer nerd so heres a guide on updating this website :3

Your website is just a bunch of folders and files on the github website. If you add a picture file in the right folder, it shows up on your site. You never have to touch the scary code parts.

Think of github.com as Google Drive for your website. You open folders, you upload stuff, you press save. A little robot watches and updates the site for you in like 1 minute. You don't have to do anything extra.

## 0. How to change anything - the clicks

1. Go to github.com and log in. Open your website project: `alexballistic.github.io`
2. You will see a list of folders. Click one to go inside it, like `content` then `drawings`
3. To ADD pictures:
   - Click `Add file` button (top right), then `Upload files`
   - Drag your pictures in, then press the green `Commit changes` button. That green button just means SAVE.
4. To CHANGE words in a file:
   - Click the file name to open it
   - Click the little pencil icon (edit)
   - Type your changes
   - Press the green `Commit changes` button to save
5. Wait 1-2 minutes, then refresh your real website. Done.

Green button = save. That's it. You don't need to know any other github words.

## 1. Drawings and comics

This is the easiest one.

- Your drawings are in: `content` -> `drawings`
- Your comics are in: `content` -> `comics`

Just go in there, press `Add file > Upload files`, drag your art in, press save.

Good file types: pictures and short videos. Name them with no spaces, like `cool-drawing.png` not `cool drawing!!!.png`

To delete one: open the file, click the 3 dots `...` menu top right, click `Delete file`, press save.

## 2. Photos

Photos are grouped by day.

1. On your own computer, make a new folder and name it the date, like `9.01.2026`
2. Put your photos inside that folder
3. Inside that same folder, make a normal text file called `text.txt`. This is the caption under the photos. Just write normal words in it, like:
```
park photos!! more to come.
```
4. On github, go to `content` -> `photos`
5. Press `Add file > Upload files`, then drag your WHOLE date folder in at once. Press save.

That's it. Your new date button will appear on the photography page by itself.

## 3. Logs - like a diary

Logs are in: `content` -> `logs`

1. Go in there, press `Add file > Create new file`
2. Name it something like `log2-cool.txt` (.txt at the end is important)
3. Write in it. The very first line becomes the big title automatically. So do:
```
My cool day!!

Today I drew stuff and it was fun.
```
4. Want a picture in the middle of your words? Put this on its own line:
```
[img:content/drawings/bentemp.png]
```
Just change that to the path of your picture. You can also add a little bouncing guy with `(alexrun.gif)`

5. Press save.

## 4. Status box - the little box on the side

1. Go to `content` and open the file called `statuses.json`
2. Click the pencil to edit
3. Copy one of the blocks already there, paste it at the TOP of the list, and just change the words. Newest stuff must always be on top.
4. It has to look exactly like this, commas and quotes included:
```
{
  "date": "2026-09-30",
  "time": "12:25 am",
  "text": "write your new status here!!"
}
```
- date: year-month-day, like `2026-10-01`
- time: whatever, like `5:00 pm`
- text: your status, just normal words

5. Press save. The home page will show the top one.

If it breaks, you probably deleted a comma or a `"`. Undo and try again by copying exactly.

## 5. About, scrolling words, and random silly words

These are just plain text files in `content`. Open, pencil icon, change words, save.

- `about.txt` = the about box on the home page
- `other.txt` = the other page
- `scrolling.txt` = the scrolling welcome words at the top. It's just one long line, that's normal.
- `splashes.txt` = the random silly line under SUPA WELCOME. One line = one random choice. Just add a new line at the bottom.
- Banners (the big pictures at the top): go to `content` -> `banners`, upload a new picture there and save. The robot adds it to the slideshow by itself.

## 6. Links page

1. Go to `content` and open `links.json`
2. Click pencil to edit
3. Find a part that looks like this and copy it:
```
{
  "label": "Youtube: @alexBallistic",
  "url": "https://www.youtube.com/@alexBallistic"
}
```
4. Change only the inside words. Label = what people see. Url = where it goes when clicked. Paste your new one in the list. Make sure there is a comma `,` between each one, just like the ones already there.
5. Press save.

Rule: never delete all the `[ ] { } " ,` symbols. Only change the words inside the quotes.

## 7. If it looks broken

- Wait 2 minutes and refresh. The robot is slow sometimes.
- Did you forget the green save button?
- Did you delete a comma or `"` in statuses or links? Those files are picky. Copy an old one exactly and only change the words.
- Pictures not showing? Check the name has no spaces and ends in `.png` or `.jpg`

You can't really break it forever. All old versions are saved, Shovel (me) can undo it. So just try stuff :3
