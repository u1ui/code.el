# &lt;u1-code&gt; - element
Highlighted, editable code-blocks.

## Ussage

```html
<u1-code trim editable>
    <style>
        .foo {
            color: red;
        }
    </style>
</u1-code>
```

```css
u1-code {
    font-size:15px;
    max-height:11rem;
}
```

## Install

```html
<link href="https://cdn.jsdelivr.net/gh/u1ui/code.el@3.0.0/code.min.css" rel=stylesheet>
<script src="https://cdn.jsdelivr.net/gh/u1ui/code.el@3.0.0/code.min.js" type=module>
```

## Demos

[minimal.html](http://gcdn.li/u1ui/code.el@main/tests/minimal.html)  
[test.html](http://gcdn.li/u1ui/code.el@main/tests/test.html)  

## Attributes

`trim`: This will trim empty first and last lines, and most importantly, indentation.  
`editable`: This will make the code editable.  
`language`: Define the code-language (auto-detect if not set)

## About

- MIT License, Copyright (c) 2022 <u1> (like all repositories in this organization) <br>
- Suggestions, ideas, finding bugs and making pull requests make us very happy. ♥

