# Changelog

{{ range .Versions }}

## {{ .Tag.Name }} ({{ datetime "2006-01-02" .Tag.Date }})

{{ range .CommitGroups }}

### {{ .Title }}

{{ range .Commits }}

- {{ if .Scope }}**{{ .Scope }}:** {{ end }}{{ .Subject }} ([{{ .Hash.Short }}]({{ .CommitURL }}))
  {{ end }}
  {{ end }}

{{ range .NoteGroups }}

### {{ .Title }}

{{ range .Notes }}

- {{ .Body }}
  {{ end }}
  {{ end }}
  {{ end }}
