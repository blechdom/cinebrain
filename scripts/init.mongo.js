db = new Mongo().getDB('cinebrain');

db.devices.remove({});

db.devices.insert([
{ "device_number" : 1, "name" : "CasparCG", "core" : "Core", "purpose" : "video playback, recording, streaming", "protocol" : "TCP", "port" : 5250, "specification" : "AMCP", "control_types" : "play, stop, layer, stream, CG", "status" : null, "who" : "Matthew", "notes" : "server enumerates library and plays on command", "example_command" : null, "manual_link" : "http://casparcg.com/wiki/CasparCG_2.0_AMCP_Protocol" },
{ "device_number" : 2, "name" : "Sony SRG-120", "core" : "Core", "purpose" : "camera", "protocol" : "TCP", "port" : 52380, "specification" : "VISCA", "control_types" : "pan, tilt, zoom, speed, store preset", "status" : null, "who" : "Matthew", "notes" : "For hex bytes, use \\xFF format, so your commands would be:", "example_command" : "\\x81\\x01\\x04\\x00\\x02\\xFF", "manual_link" : "https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwiziZuOh-fXAhVTwGMKHcY_C-4QFggpMAA&url=https%3A%2F%2Fpro.sony.com%2Fbbsc%2FassetDownloadController%2FSRG-120DH_Technical_Manual.pdf%3Fpath%3DAsset%2520Hierarchy%24Professional%24SEL-yf-generic-153703%24SEL-yf-generic-153738SEL-asset-494563.pdf%26id%3DStepID%24SEL-asset-494563%24original%26dimension%3Doriginal&usg=AOvVaw040H5kVIo9VBDdltx00uqc" },
{ "device_number" : 3, "name" : "Hyperdeck Mini", "core" : "Core", "purpose" : "video playback", "protocol" : "TCP", "port" : 9993, "specification" : "Version 1.8", "control_types" : "play, pause, record, speed, loop", "status" : null, "who" : "Matthew", "notes" : null, "example_command" : null, "manual_link" : null },
{ "device_number" : 4, "name" : "ATEM 1M/E", "core" : "Core", "purpose" : "video switching", "protocol" : "TCP", "port" : 9910, "specification" : "API", "control_types" : "switching", "status" : null, "who" : "Matthew", "notes" : null, "example_command" : null, "manual_link" : "http://skaarhoj.com/fileadmin/BMDPROTOCOL.html" },
{ "device_number" : 5, "name" : "MXLight", "core" : "Core", "purpose" : "streaming", "protocol" : "TCP", "port" : 41120, "specification" : "CLI", "control_types" : "record, stream, play, pause, stop, speed, configure", "status" : null, "who" : "Matthew", "notes" : "Allows for live streaming from ATEM or BMD H.264 interface", "example_command" : null, "manual_link" : "http://mxlight.co.uk/rc-ip.html" },
{ "device_number" : 6, "name" : "Windows 10", "core" : "Core", "purpose" : "command line", "protocol" : "TCP", "port" : 22, "specification" : "SSH", "control_types" : "full control of system", "status" : null, "who" : "Matthew", "notes" : "FFMPEG, etc.", "example_command" : null, "manual_link" : "https://www.ctrl.blog/entry/how-to-win10-ssh-service" },
{ "device_number" : 7, "name" : "MacOSX", "core" : "Core", "purpose" : "command line", "protocol" : "TCP", "port" : 22, "specification" : "SSH", "control_types" : "full control of system", "status" : null, "who" : null, "notes" : null, "example_command" : null, "manual_link" : null },
{ "device_number" : 8, "name" : "Linux", "core" : "Core", "purpose" : "command line", "protocol" : "TCP", "port" : 22, "specification" : "SSH", "control_types" : "full control of system", "status" : null, "who" : null, "notes" : null, "example_command" : null, "manual_link" : null },
{ "device_number" : 9, "name" : "ArtNet", "core" : "Protocol", "purpose" : "lighting and media", "protocol" : "TCP/UDP", "port" : 6454, "specification" : "ArtNet", "control_types" : "play, stop, note-on, note-off, channel, bank, patch", "status" : null, "who" : "Kristin", "notes" : null, "example_command" : null, "manual_link" : null },
{ "device_number" : 10, "name" : "rtMIDI", "core" : "Protocol", "purpose" : "device control", "protocol" : "TCP/UDP", "port" : 5004, "specification" : "MIDI", "control_types" : "play, stop, note-on, note-off, channel, bank, patch, sysEx", "status" : null, "who" : "Kristin", "notes" : null, "example_command" : null, "manual_link" : "https://www.npmjs.com/package/midi" },
{ "device_number" : 11, "name" : "OSC", "core" : "Protocol", "purpose" : "lighting and media control", "protocol" : "UDP", "port" : 10023, "specification" : "OSC", "control_types" : null, "status" : null, "who" : null, "notes" : null, "example_command" : null, "manual_link" : null },
{ "device_number" : 12, "name" : "ChauvetIntimidator", "core" : null, "purpose" : "moving light", "protocol" : "DMX", "port" : null, "specification" : null, "control_types" : "pan, tilt, color, gobo, speed", "status" : null, "who" : "Kristin", "notes" : "Uses Enntec USB", "example_command" : null, "manual_link" : null },
{ "device_number" : 13, "name" : "SSR", "core" : null, "purpose" : "moving light", "protocol" : "DMX", "port" : null, "specification" : null, "control_types" : "pan, tilt, color, gobo, speed", "status" : null, "who" : "Kristin", "notes" : "Uses Enntec USB", "example_command" : null, "manual_link" : null },
{ "device_number" : 14, "name" : null, "core" : null, "purpose" : "projector", "protocol" : "TCP", "port" : null, "specification" : null, "control_types" : "on, blank, off", "status" : null, "who" : "Kristin", "notes" : null, "example_command" : null, "manual_link" : null },
{ "device_number" : 15, "name" : "Max7", "core" : "Core", "purpose" : "I/O and hypervisor", "protocol" : null, "port" : null, "specification" : null, "control_types" : null, "status" : null, "who" : null, "notes" : null, "example_command" : null, "manual_link" : null },
]);

db.device_1_casparcg.remove({});

db.device_1_casparcg.insert([
{ "command" : "play", "description" : "core", "notes" : "PLAY <channel>-<layer> <resource> <parameters>" },
{ "command" : "loop", "description" : "parameter", "notes" : "PLAY 1-1 MOVIE LOOP" },
{ "command" : "seek", "description" : "parameter", "notes" : "PLAY 1-1 MOVIE SEEK 100 LOOP" },
{ "command" : "loadbg", "description" : "core", "notes" : "loads into buffer" },
{ "command" : "image scroll", "description" : "special", "notes" : "PLAY 1-2 test_scroll SPEED 5 BLUR 50" },
{ "command" : "colors", "description" : "special", "notes" : "PLAY 1 #FFFFFF" },
{ "command" : "position", "description" : "mixer", "notes" : "MIXER 1-0 FILL 0.25 0.25 0.5 0.5 25 easeinsine" },
{ "command" : "clip", "description" : "mixer", "notes" : "MIXER 1-0 CLIP 0.25 0.25 0.5 0.5 25 easeinsine" },
{ "command" : "transform", "description" : "mixer", "notes" : "MIXER 1-10 PERSPECTIVE 0.4 0.4 0.6 0.4 1 1 0 1" },
{ "command" : "Grid", "description" : "mixer", "notes" : "MIXER 1 GRID 2" },
{ "command" : "cls", "description" : "list", "notes" : "lists all media in folder" },
{ "command" : "record", "description" : "record", "notes" : "ADD 1 FILE myfile.mov" },
{ "command" : "stop", "description" : "stop", "notes" : "REMOVE 1 FILE" }
]);

db.device_2_sonysrg120.remove({});

db.device_2_sonysrg120.insert([
{ "_id" : { "oid" : "5a444e3f569f64262ccaed0a" }, "command" : "AddressSet", "purpose" : "Broadcast", "packet" : "88 30 01 FF", "note" : "Address setting" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed0b" }, "command" : "IF_Clear", "purpose" : "Broadcast", "packet" : "88 01 00 01 FF", "note" : "I/F Clear" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed0c" }, "command" : "CommandCancel", "purpose" : null, "packet" : "8x 21 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed0d" }, "command" : "CAM_Power", "purpose" : "On", "packet" : "8x 01 04 00 02 FF", "note" : "Power ON/OFF" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed0e" }, "command" : null, "purpose" : "Off", "packet" : "8x 01 04 00 03 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed0f" }, "command" : "CAM_Zoom", "purpose" : "Stop", "packet" : "8x 01 04 07 00 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed10" }, "command" : null, "purpose" : "Tele(Standard)", "packet" : "8x 01 04 07 02 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed11" }, "command" : null, "purpose" : "Wide(Standard)", "packet" : "8x 01 04 07 03 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed12" }, "command" : null, "purpose" : "Tele(Variable)", "packet" : "8x 01 04 07 2p FF", "note" : "p = 0(low)~7(high)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed13" }, "command" : null, "purpose" : "Wide(Variable)", "packet" : "8x 01 04 07 3p FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed14" }, "command" : null, "purpose" : "Direct", "packet" : "8x 01 04 47 0p 0q 0r 0s FF", "note" : "pqrs: Zoom Position (0(wide) ~0x4000(tele))" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed15" }, "command" : "CAM_Focus", "purpose" : "Stop", "packet" : "8x 01 04 08 00 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed16" }, "command" : null, "purpose" : "Far(Standard)", "packet" : "8x 01 04 08 02 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed17" }, "command" : null, "purpose" : "Near(Standard)", "packet" : "8x 01 04 08 03 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed18" }, "command" : null, "purpose" : "Direct", "packet" : "8x 01 04 48 0p 0q 0r 0s FF", "note" : "pqrs: Focus Position" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed19" }, "command" : null, "purpose" : "One Push AF", "packet" : "8x 01 04 18 01 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed1a" }, "command" : "CAM_ZoomFocus", "purpose" : "Direct", "packet" : "8x 01 04 47 0p 0q 0r 0s 0t 0u 0v 0w FF", "note" : "pqrs: Zoom Position (0(wide)~ 0x4000(tele)) tuvw: Focus Position" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed1b" }, "command" : "CAM_WB", "purpose" : "Auto", "packet" : "8x 01 04 35 00 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed1c" }, "command" : null, "purpose" : "Indoor", "packet" : "8x 01 04 35 01 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed1d" }, "command" : null, "purpose" : "Outdoor", "packet" : "8x 01 04 35 02 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed1e" }, "command" : null, "purpose" : "OnePush", "packet" : "8x 01 04 35 03 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed1f" }, "command" : null, "purpose" : "Manual", "packet" : "8x 01 04 35 05 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed20" }, "command" : null, "purpose" : "Outdoor Auto", "packet" : "8x 01 04 35 06 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed21" }, "command" : null, "purpose" : "Sodium Lamp Auto", "packet" : "8x 01 04 35 07 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed22" }, "command" : null, "purpose" : "Sodium Auto", "packet" : "8x 01 04 35 08 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed23" }, "command" : "CAM_RGain", "purpose" : "Reset", "packet" : "8x 01 04 03 00 FF", "note" : "Manual Control of R Gain" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed24" }, "command" : null, "purpose" : "Up", "packet" : "8x 01 04 03 02 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed25" }, "command" : null, "purpose" : "Down", "packet" : "8x 01 04 03 03 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed26" }, "command" : null, "purpose" : "Direct", "packet" : "8x 01 04 43 00 00 0p 0q FF", "note" : "pq: R Gain (0~0xFF)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed27" }, "command" : "CAM_Bgain", "purpose" : "Reset", "packet" : "8x 01 04 04 00 FF", "note" : "Manual Control of B Gain" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed28" }, "command" : null, "purpose" : "Up", "packet" : "8x 01 04 04 02 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed29" }, "command" : null, "purpose" : "Down", "packet" : "8x 01 04 04 03 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed2a" }, "command" : null, "purpose" : "Direct", "packet" : "8x 01 04 44 00 00 0p 0q FF", "note" : "pq: B Gain (0-0xFF)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed2b" }, "command" : "CAM_AE", "purpose" : "Full Auto", "packet" : "8x 01 04 39 00 FF", "note" : "Automatic Exposure mode" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed2c" }, "command" : null, "purpose" : "Manual", "packet" : "8x 01 04 39 03 FF", "note" : "Manual Control mode" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed2d" }, "command" : null, "purpose" : "Bright", "packet" : "8x 01 04 39 0D FF", "note" : "Bright mode(Manual control)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed2e" }, "command" : "CAM_Shutter", "purpose" : "Reset", "packet" : "8x 01 04 0A 00 FF", "note" : "Shutter Setting" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed2f" }, "command" : null, "purpose" : "Up", "packet" : "8x 01 04 0A 02 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed30" }, "command" : null, "purpose" : "Down", "packet" : "8x 01 04 0A 03 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed31" }, "command" : null, "purpose" : "Direct", "packet" : "8x 01 04 4A 00 00 0p 0q FF", "note" : "pq: Shutter Position (0~0x15)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed32" }, "command" : "CAM_Iris", "purpose" : "Reset", "packet" : "8x 01 04 0B 00 FF", "note" : "Iris Setting" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed33" }, "command" : null, "purpose" : "Up", "packet" : "8x 01 04 0B 02 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed34" }, "command" : null, "purpose" : "Down", "packet" : "8x 01 04 0B 03 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed35" }, "command" : null, "purpose" : "Direct", "packet" : "8x 01 04 4B 00 00 0p 0q FF", "note" : "pq: Iris Position (0~ 0x11)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed36" }, "command" : "CAM_Gain", "purpose" : "Reset", "packet" : "8x 01 04 0C 00 FF", "note" : "Gain Setting" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed37" }, "command" : null, "purpose" : "Up", "packet" : "8x 01 04 0C 02 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed38" }, "command" : null, "purpose" : "Down", "packet" : "8x 01 04 0C 03 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed39" }, "command" : null, "purpose" : "Direct", "packet" : "8x 01 04 0C 00 00 0p 0q FF", "note" : "pq: Gain Position (0~0x0E)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed3a" }, "command" : "CAM_Bright", "purpose" : "Reset", "packet" : "8x 01 04 0D 00 FF", "note" : "Bright Setting" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed3b" }, "command" : null, "purpose" : "Up", "packet" : "8x 01 04 0D 02 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed3c" }, "command" : null, "purpose" : "Down", "packet" : "8x 01 04 0D 03 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed3d" }, "command" : null, "purpose" : "Direct", "packet" : "8x 01 04 4D 00 00 0p 0q FF", "note" : "pq: Bright l Positon ()" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed3e" }, "command" : "CAM_ExpComp", "purpose" : "On", "packet" : "8x 01 04 3E 02 FF", "note" : "Exposure Compensation ON/OFF" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed3f" }, "command" : null, "purpose" : "Off", "packet" : "8x 01 04 3E 03 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed40" }, "command" : null, "purpose" : "Reset", "packet" : "8x 01 04 0E 00 FF", "note" : "Exposure Compensation Amount Setting" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed41" }, "command" : null, "purpose" : "Up", "packet" : "8x 01 04 0E 02 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed42" }, "command" : null, "purpose" : "Down", "packet" : "8x 01 04 0E 03 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed43" }, "command" : null, "purpose" : "Direct", "packet" : "8x 01 04 4E 00 00 0p 0q FF", "note" : "pq: ExpComp Position (0~0x0E)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed44" }, "command" : "CAM_BackLight", "purpose" : "On", "packet" : "8x 01 04 33 02 FF", "note" : "BackLight On" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed45" }, "command" : null, "purpose" : "Off", "packet" : "8x 01 04 33 03 FF", "note" : "BackLight Off" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed46" }, "command" : "CAM_Aperture", "purpose" : "Reset", "packet" : "8x 01 04 02 00 FF", "note" : "Aperture Control" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed47" }, "command" : null, "purpose" : "Up", "packet" : "8x 01 04 02 02 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed48" }, "command" : null, "purpose" : "Down", "packet" : "8x 01 04 02 03 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed49" }, "command" : null, "purpose" : "Direct", "packet" : "8x 01 04 42 00 00 0p 0q FF", "note" : "pq: Aperture Gain (0~0x04)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed4a" }, "command" : "CAM_Memory", "purpose" : "Reset", "packet" : "8x 01 04 3F 00 0p FF", "note" : "p: Memory Number(=0 to 127)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed4b" }, "command" : null, "purpose" : "Set", "packet" : "8x 01 04 3F 01 0p FF", "note" : "Corresponds to 0 to 9 on the Remote Commander" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed4c" }, "command" : null, "purpose" : "Recall", "packet" : "8x 01 04 3F 02 0p FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed4d" }, "command" : "CAM_LR_Reverse", "purpose" : "On", "packet" : "8x 01 04 61 02 FF", "note" : "Image Flip Horizontal ON/OFF" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed4e" }, "command" : null, "purpose" : "Off", "packet" : "8x 01 04 61 03 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed4f" }, "command" : "CAM_PictureFlip", "purpose" : "On", "packet" : "8x 01 04 66 02 FF", "note" : "Image Flip Vertical ON/OFF" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed50" }, "command" : null, "purpose" : "Off", "packet" : "8x 01 04 66 03 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed51" }, "command" : "CAM_MountMode", "purpose" : "UP", "packet" : "8x 01 04 A4 02 FF", "note" : "Mount Up" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed52" }, "command" : null, "purpose" : "Down", "packet" : "8x 01 04 A4 03 FF", "note" : "Mount Down" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed53" }, "command" : "CAM_ColorGain", "purpose" : "Direct", "packet" : "8x 01 04 49 00 00 00 0p FF", "note" : "(0~0x0E)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed54" }, "command" : "CAM_2D\nNoise reduction", "purpose" : "Direct", "packet" : "8x 01 04 53 0p FF", "note" : "(0~0x05)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed55" }, "command" : "CAM_3D\nNoise reduction", "purpose" : "Direct", "packet" : "8x 01 04 54 0p FF", "note" : "(0~0x03)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed56" }, "command" : "FLICK", "purpose" : "50HZ", "packet" : "81 01 04 23 01 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed57" }, "command" : null, "purpose" : "60HZ", "packet" : "81 01 04 23 02 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed58" }, "command" : "Freeze", "purpose" : "Freeze On", "packet" : "81 01 04 62 02 FF", "note" : "Freeze On Immediately" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed59" }, "command" : null, "purpose" : "Freeze Off", "packet" : "81 01 04 62 03 FF", "note" : "Freeze Off Immediately" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed5a" }, "command" : null, "purpose" : "Preset Freeze On", "packet" : "81 01 04 62 22 FF", "note" : "Freeze On When Running Preset" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed5b" }, "command" : null, "purpose" : "Preset Freeze Off", "packet" : "81 01 04 62 23 FF", "note" : "Freeze Off When Running Preset" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed5c" }, "command" : "VideoSystem Set", "purpose" : null, "packet" : "8x 01 06 35 00 pp FF", "note" : "pp: 0~18 Video format 0:1080P60 \n1:1080P50 \n2:1080I60 \n3:1080I50 \n4:1080P30 \n5:1080P25 \n6:720P60 \n7:720P50 \n8:720P30 \n9:720P25 \n10:1600*900@60(USB OUTPUT) \n11:1440*900@60HZ(USB OUTPUT) \n12:1366*768@60HZ(USB OUTPUT) \n13:1280*800@60HZ(USB OUTPUT) \n14:1024*768@60HZ(USB OUTPUT) \n15:800*600@60HZ(USB OUTPUT) \n16:800*600@30HZ(USB OUTPUT) 17:640*480@60HZ(USB OUTPUT) 18:640*480@30HZ(USB OUTPUT)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed5d" }, "command" : "CAM_IDWrite", "purpose" : null, "packet" : "8x 01 04 22 0p 0q 0r 0s FF", "note" : "pqrs: Camera ID (=0000 to FFFF)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed5e" }, "command" : "SYS_Menu", "purpose" : "Menu On", "packet" : "8x 01 06 06 02 FF", "note" : "Turn on the menu" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed5f" }, "command" : null, "purpose" : "Menu Off", "packet" : "8x 01 06 06 03 FF", "note" : "Turn off the menu" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed60" }, "command" : null, "purpose" : "Menu Back", "packet" : "8x 01 06 06 10 FF", "note" : "Menu step back" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed61" }, "command" : null, "purpose" : "Menu Ok", "packet" : "8x 01 7E 01 02 00 01 FF", "note" : "Menu ok" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed62" }, "command" : "IR_Transfer", "purpose" : "Transfer On", "packet" : "8x 01 06 1A 02 FF", "note" : "Receive IR (remote commander) CODE from VISCA communication ON/OFF" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed63" }, "command" : null, "purpose" : "Transfer Off", "packet" : "8x 01 06 1A 03 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed64" }, "command" : "IR_Receive", "purpose" : "On", "packet" : "8x 01 06 08 02 FF", "note" : "IR (remote commander) receive ON/OFF" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed65" }, "command" : null, "purpose" : "Off", "packet" : "8x 01 06 08 03 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed66" }, "command" : null, "purpose" : "On/Off", "packet" : "8x 01 06 08 10 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed67" }, "command" : "IR_ReceiveReturn", "purpose" : "On", "packet" : "8x 01 7D 01 03 00 00 FF", "note" : "IR (remote commander) receive message via the VISCA communication ON/OFF" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed68" }, "command" : null, "purpose" : "Off", "packet" : "8x 01 7D 01 13 00 00 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed69" }, "command" : "Pan_tiltDrive", "purpose" : "Up", "packet" : "8x 01 06 01 VV WW 03 01 FF", "note" : "VV: Pan speed 0x01 (low speed) to 0x18 (high speed)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed6a" }, "command" : null, "purpose" : "Down", "packet" : "8x 01 06 01 VV WW 03 02 FF", "note" : "WW: Tilt speed 0x01 (low speed) to 0x14 (high speed)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed6b" }, "command" : null, "purpose" : "Left", "packet" : "8x 01 06 01 VV WW 01 03 FF", "note" : "YYYY: Pan Position (TBD)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed6c" }, "command" : null, "purpose" : "Right", "packet" : "8x 01 06 01 VV WW 02 03 FF", "note" : "ZZZZ: Tilt Position (TBD)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed6d" }, "command" : null, "purpose" : "Upleft", "packet" : "8x 01 06 01 VV WW 01 01 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed6e" }, "command" : null, "purpose" : "Upright", "packet" : "8x 01 06 01 VV WW 02 01 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed6f" }, "command" : null, "purpose" : "DownLeft", "packet" : "8x 01 06 01 VV WW 01 02 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed70" }, "command" : null, "purpose" : "DownRight", "packet" : "8x 01 06 01 VV WW 02 02 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed71" }, "command" : null, "purpose" : "Stop", "packet" : "8x 01 06 01 VV WW 03 03 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed72" }, "command" : null, "purpose" : "AbsolutePosition", "packet" : "8x 01 06 02 VV WW \n0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed73" }, "command" : null, "purpose" : "RelativePosition", "packet" : "8x 01 06 03 VV WW \n0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed74" }, "command" : null, "purpose" : "Home", "packet" : "8x 01 06 04 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed75" }, "command" : null, "purpose" : "Reset", "packet" : "8x 01 06 05 FF", "note" : null },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed76" }, "command" : "Pan-tiltLimitSet", "purpose" : "Set", "packet" : "8x 01 06 07 00 0W", "note" : "W:1 UpRight 0:DownLeft" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed77" }, "command" : null, "purpose" : null, "packet" : "0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF", "note" : "YYYY: Pan Limit Position(TBD)" },
{ "_id" : { "oid" : "5a444e3f569f64262ccaed78" }, "command" : null, "purpose" : "Clear", "packet" : "8x 01 06 07 01 0W\n07 0F 0F 0F 07 0F 0F 0F FF", "note" : "ZZZZ: Tilt Limit Position(TBD)" },
]);

db.device_3_bmdhyperdeckmini.remove({});

db.device_3_bmdhyperdeckmini.insert([
{ "_id" : { "oid" : "5a444e66569f64262ccaed81" }, "command" : "help", "description" : "more on page 44", "notes" : "there is also some clips timeline purposeality ??" },
{ "_id" : { "oid" : "5a444e66569f64262ccaed82" }, "command" : "commands", "description" : "Returns XML", "notes" : null },
{ "_id" : { "oid" : "5a444e66569f64262ccaed83" }, "command" : "disk list", "description" : "list clips on disk", "notes" : null },
{ "_id" : { "oid" : "5a444e66569f64262ccaed84" }, "command" : "disk list: slot n", "description" : "multiple SD slots", "notes" : null },
{ "_id" : { "oid" : "5a444e66569f64262ccaed85" }, "command" : "preview: enable: true", "description" : "output on preview bus", "notes" : null },
{ "_id" : { "oid" : "5a444e66569f64262ccaed86" }, "command" : "preview: disable: true", "description" : "output on main bus", "notes" : null },
{ "_id" : { "oid" : "5a444e66569f64262ccaed87" }, "command" : "play", "description" : "play from current tc", "notes" : null },
{ "_id" : { "oid" : "5a444e66569f64262ccaed88" }, "command" : "play: speed", "description" : "-1600 to 1600", "notes" : null },
{ "_id" : { "oid" : "5a444e66569f64262ccaed89" }, "command" : "play: loop: true", "description" : null, "notes" : null },
{ "_id" : { "oid" : "5a444e66569f64262ccaed8a" }, "command" : "play: single clip: true", "description" : null, "notes" : null },
{ "_id" : { "oid" : "5a444e66569f64262ccaed8b" }, "command" : "playrange set: in: inT out: outT", "description" : null, "notes" : null },
{ "_id" : { "oid" : "5a444e66569f64262ccaed8c" }, "command" : "record", "description" : "record current", "notes" : null },
{ "_id" : { "oid" : "5a444e66569f64262ccaed8d" }, "command" : "record: name: [name]", "description" : null, "notes" : null },
{ "_id" : { "oid" : "5a444e66569f64262ccaed8e" }, "command" : "stop", "description" : null, "notes" : null },
]);

db.device_4_mxlight.remove({});

db.device_4_mxlight.insert([
{ "_id" : { "oid" : "5a444ea0569f64262ccaed94" }, "command" : "record", "value(s)" : "on / off", "example" : "record=on", "description" : "turn recording on or off" },
{ "_id" : { "oid" : "5a444ea0569f64262ccaed95" }, "command" : "record-to-file", "value(s)" : "{filename}", "example" : "record-to-file='C:\tmp.TS'", "description" : "specify a filename for the next recording" },
{ "_id" : { "oid" : "5a444ea0569f64262ccaed96" }, "command" : "record-split", "value(s)" : "{takes no values}", "example" : "record-split", "description" : "split the current recording immediately into a new file" },
{ "_id" : { "oid" : "5a444ea0569f64262ccaed97" }, "command" : "preview", "value(s)" : "on / off", "example" : "preview=on", "description" : "turn preview on or off" },
{ "_id" : { "oid" : "5a444ea0569f64262ccaed98" }, "command" : "stream", "value(s)" : "on / off", "example" : "stream=on", "description" : "turn streaming on or off" },
{ "_id" : { "oid" : "5a444ea0569f64262ccaed99" }, "command" : "stream-profile", "value(s)" : "{stream profile name}", "example" : "stream-profile='my profile name'", "description" : "select a streaming preset to use [see below]" },
{ "_id" : { "oid" : "5a444ea0569f64262ccaed9a" }, "command" : "useconf", "value(s)" : "{override config file}", "example" : "useconf='cfg-cli\\2Mbps.cda'", "description" : "load config settings [see below]" },
{ "_id" : { "oid" : "5a444ea0569f64262ccaed9b" }, "command" : "exit", "value(s)" : "{takes no values}", "example" : "exit", "description" : "exit MX Light" },
{ "_id" : { "oid" : "5a444ea0569f64262ccaed9c" }, "command" : "gui-config", "value(s)" : "show / hide", "example" : "gui-config=hide", "description" : "set GUI to visible / not visible (taskbar icon)" },
{ "_id" : { "oid" : "5a444ea0569f64262ccaed9d" }, "command" : "gui-stats", "value(s)" : "show / hide", "example" : "gui-stats=hide", "description" : "set status window visiblility" },
{ "_id" : { "oid" : "5a444ea0569f64262ccaed9e" }, "command" : "replay-mode", "value(s)" : "from / range", "example" : "replay-mode=from", "description" : "set replay mode" },
{ "_id" : { "oid" : "5a444ea0569f64262ccaed9f" }, "command" : "replay-speed", "value(s)" : "{number}", "example" : "replay-speed=0.3", "description" : "set replay speed" },
{ "_id" : { "oid" : "5a444ea0569f64262ccaeda0" }, "command" : "replay-add-cue", "value(s)" : "{cue name}", "example" : "replay-add-cue=newCue", "description" : "add a new replay cue at the current point in the recording" },
{ "_id" : { "oid" : "5a444ea0569f64262ccaeda1" }, "command" : "replay-play-cue", "value(s)" : "{cue name}", "example" : "replay-play-cue=newCue", "description" : "start replay from a specified cue" },
{ "_id" : { "oid" : "5a444ea0569f64262ccaeda2" }, "command" : "replay-play-last-cue", "value(s)" : null, "example" : "replay-play-last-cue", "description" : "start replay from last created cue" },
{ "_id" : { "oid" : "5a444ea0569f64262ccaeda3" }, "command" : "replay-stop", "value(s)" : null, "example" : "replay-stop", "description" : "stop the current replay & close plaback window" },
{ "_id" : { "oid" : "5a444ea0569f64262ccaeda4" }, "command" : "snapshot", "value(s)" : null, "example" : "snapshot", "description" : "save a snapshot of the current VLC preview window as a file. nb. the output directory & file format are set in VLC's Video preferences." },
{ "_id" : { "oid" : "5a444ea0569f64262ccaeda5" }, "command" : "lock-state", "value(s)" : "on / off", "example" : "lock-state=on", "description" : null },
]);


db.issues.remove({});

db.issues.insert([
  {
    status: 'Open', owner: 'Ravan',
    created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    status: 'Assigned', owner: 'Eddie',
    created: new Date('2016-08-16'), effort: 14, completionDate: new Date('2016-08-30'),
    title: 'Missing bottom border on panel',
  },
]);

db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });
