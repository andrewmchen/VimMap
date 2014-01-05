# VimMap

---

A frontend webapp used to assist the visualization of custom vim mappings.

Used to avoid overwriting already made custom mappings.

## Installation

Soon this will be hosted somewhere. As of now, 

'''bash
# Clone project
$ git clone git://github.com/andrewmchen/vimmap
$ cd vimmap
$ open index.html
'''

## Usage
Open Vim.
'''bash
:redir! > vim_maps.txt 
:map 
'''
Enter until all mappings are redirected.
'''bash
:map!
'''
Enter until all mappings are redirected.
'''bash
:redir END
'''
Paste all mappings in ~/vim_maps.txt to textarea.
