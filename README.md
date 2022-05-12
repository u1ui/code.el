# code.el
highlighted, editable code-blocks.


## Attributes

`trim`: This will trim empty first and last lines, and most importantly, indentation.  
`editable`: This will make the code editable.

## Ussage

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/u1ui/code.el@x.x.x/code.css">
<scrip src="https://cdn.jsdelivr.net/gh/u1ui/code.el@x/code.js"></script>

<u1-code trim>
    <pre>
        <code>
            html {
                background:red;
            }
        </code>
    </pre>
</u1-code>

pre and code blocks are optional, but recommended. to have a usefull fallback if javascript is disabled.

OR:

<u1-code trim>
    <textarea>
            html {
                background:red;
            }
    </textarea>
</u1-code>

or even:

<u1-code editable trim>
    <style>
            html {
                background:red;
            }
    </style>
</u1-code>


```


## Demo
https://raw.githack.com/u1ui/code.el/main/tests/test.html  

