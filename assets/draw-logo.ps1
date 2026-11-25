# Draws public/projects/moilolon.png (800x500), the image of this project's card, like the other
# project logos: on white, centred, inside the band the card's object-cover always shows.
# The mark is the favicon every moilolon.com site uses (src/app/icon.svg).
# Run from the repository root: powershell -NoProfile -File assets/draw-logo.ps1
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

function Get-Color([string]$hex) { return [System.Drawing.ColorTranslator]::FromHtml($hex) }

$bitmap = New-Object System.Drawing.Bitmap 800, 500
$g = [System.Drawing.Graphics]::FromImage($bitmap)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear([System.Drawing.Color]::White)

$font = New-Object System.Drawing.Font('Segoe UI Semibold', 64)
$word = 'moilolon'
$wordSize = $g.MeasureString($word, $font)

# The favicon, a 64-unit square, drawn at $size px, then the name beside it.
$size = 140
$scale = $size / 64
$gap = 28
$x = (800 - ($size + $gap + $wordSize.Width)) / 2
$y = (500 - $size) / 2

$square = New-Object System.Drawing.Drawing2D.GraphicsPath
$r = 16 * $scale * 2
$square.AddArc($x, $y, $r, $r, 180, 90)
$square.AddArc($x + $size - $r, $y, $r, $r, 270, 90)
$square.AddArc($x + $size - $r, $y + $size - $r, $r, $r, 0, 90)
$square.AddArc($x, $y + $size - $r, $r, $r, 90, 90)
$square.CloseFigure()
$dark = New-Object System.Drawing.SolidBrush (Get-Color '#08090D')
$g.FillPath($dark, $square)

$gradient = New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-Object System.Drawing.PointF $x, $y), (New-Object System.Drawing.PointF ($x + $size), ($y + $size)), (Get-Color '#8B7BFF'), (Get-Color '#37D6C4'))
$pen = New-Object System.Drawing.Pen($gradient, (5.5 * $scale))
$pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
$points = @(@(16, 44), @(16, 22), @(26, 35), @(32, 27), @(38, 35), @(48, 22), @(48, 44)) | ForEach-Object {
  New-Object System.Drawing.PointF ($x + $_[0] * $scale), ($y + $_[1] * $scale)
}
$g.DrawLines($pen, [System.Drawing.PointF[]]$points)

$text = New-Object System.Drawing.SolidBrush (Get-Color '#08090D')
$g.DrawString($word, $font, $text, ($x + $size + $gap), (250 - $wordSize.Height / 2))

$g.Dispose(); $square.Dispose(); $dark.Dispose(); $gradient.Dispose(); $pen.Dispose(); $font.Dispose(); $text.Dispose()
$bitmap.Save((Join-Path $root 'public/projects/moilolon.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$bitmap.Dispose()
Write-Output 'public/projects/moilolon.png written'
