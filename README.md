# VimMap

---

A frontend webapp used to assist the visualization of custom vim mappings.

Used to avoid overwriting already made custom mappings.

Solution to http://stackoverflow.com/questions/5942464/vim-list-free-keybindings

## Installation

** Now hosted at andrewmchen.com/vimmap **

```bash
$ git clone git://github.com/andrewmchen/vimmap
$ cd vimmap
$ open index.html
```

## Usage
Open Vim.
```bash
:redir! > vim_maps.txt 
:map 
```
Enter until all mappings are redirected.
```bash
:map!
```
Enter until all mappings are redirected.
```bash
:redir END
```
Paste all mappings in ~/vim_maps.txt to textarea.
