#!/bin/bash

php_config_file="/etc/php5/apache2/php.ini"
xdebug_config_file="/etc/php5/mods-available/xdebug.ini"
mysql_config_file="/etc/mysql/my.cnf"
craft_version="2.3"
craft_build="2621"
mysql_db="craft"
mysql_pass="root"

#Set Locale
echo "Setting locales..."
export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
locale-gen en_US.UTF-8 > /dev/null
dpkg-reconfigure locales > /dev/null

IPADDR=$(/sbin/ifconfig eth0 | awk '/inet / { print $2 }' | sed 's/addr://')
echo $IPADDR ubuntu.localhost >> /etc/hosts			# Just to quiet down some error messages

# Update the server
echo "Getting ip address..."
dhclient eth0 &> /dev/null
echo "Removing lock files..."
sudo rm /var/lib/apt/lists/lock
sudo rm /var/cache/apt/archives/lock
echo "Updating Server..."
apt-get -y update > /dev/null
echo "Upgrading Software..."
apt-get -y dist-upgrade &> /dev/null

# Install basic tools
echo "Installing basic tools..."
apt-get -y install build-essential binutils-doc git > /dev/null

# Install Apache
echo "Installing Apache..."
apt-get -y install apache2 > /dev/null
echo "Installing PHP..."
apt-get -y install php5 php5-curl php5-mysql php5-sqlite php5-xdebug &> /dev/null

sed -i "s/display_startup_errors = Off/display_startup_errors = On/g" ${php_config_file}
sed -i "s/display_errors = Off/display_errors = On/g" ${php_config_file}
echo "xdebug.remote_enable=On" >> ${xdebug_config_file}
echo 'xdebug.remote_connect_back=On' >> ${xdebug_config_file}

# Install MySQL
echo "mysql-server mysql-server/root_password password ${mysql_pass}" | sudo debconf-set-selections
echo "mysql-server mysql-server/root_password_again password root" | sudo debconf-set-selections
echo "Installing MySQL..."
apt-get -y install mysql-client mysql-server > /dev/null

sed -i "s/bind-address\s*=\s*127.0.0.1/bind-address = 0.0.0.0/" ${mysql_config_file}

# Create craft database
echo "Creating database with name $mysql_db..."
echo "create database ${mysql_db}" | mysql -u root --password=${mysql_pass} > /dev/null

# Allow root access from any host
echo "Granting access to database..."
echo "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION" | mysql -u root --password=${mysql_pass}
echo "GRANT PROXY ON ''@'' TO 'root'@'%' WITH GRANT OPTION" | mysql -u root --password=${mysql_pass}

# Restore Database from dump
/bin/bash scripts/mysql-restore.sh $mysql_db $mysql_pass 2> /dev/null

# Download and extract Craft
wget -qO craft.tar.gz http://download.buildwithcraft.com/craft/${craft_version}/${craft_version}.${craft_build}/Craft-${craft_version}.${craft_build}.tar.gz && echo "Downloading Craft-${craft_version}.${craft_build}.tar.gz..."
tar -zxf craft.tar.gz
rm craft.tar.gz

# Remove old files
echo "Removing old files..."
rm /var/www/html/.htaccess
rm -r craft/config && rm -r craft/plugins && rm -r craft/templates
rsync -r --ignore-existing craft /var/www && rsync -a public/ /var/www/html/
mv /var/www/html/htaccess /var/www/html/.htaccess
rm -r craft && rm -r public && rm -r /var/www/html/web.config && rm -r /var/www/html/index.html 2> /dev/null
#Give craft writing permission for the storage folder
chmod 777 /var/www/craft/storage

# AllowOverride
sed -i "s/AllowOverride None/AllowOverride All/g" /etc/apache2/apache2.conf
echo "Enabling module rewrite..."
a2enmod rewrite > /dev/null

# Install Mcrypt
echo "Installing MCrypt..."
apt-get -y install mcrypt php5-mcrypt > /dev/null
php5enmod mcrypt

# Install ImageMagick
echo "Installing Imagick..."
apt-get -y install imagemagick php5-imagick &> /dev/null

# Restart Services
echo "Restarting Services..."
service apache2 restart > /dev/null
service mysql restart > /dev/null

# Install Git (bower needs it)
echo "Installing git..."
apt-get install git > /dev/null
#use https instead of git
git config --global url."https://".insteadOf git://

# Install Node.js and update NPM
echo "Installing Node.js..."
curl -sL https://deb.nodesource.com/setup | bash - > /dev/null
apt-get install -y nodejs > /dev/null
echo "Updating npm..."
npm install npm -g > /dev/null

# Install Packages
echo "Installing npm Packages..."
cd /var/www/html
npm install --no-bin-links > /dev/null
npm install -g bower > /dev/null
npm install -g grunt-cli > /dev/null

# Update CanIUse Data
echo "Updating CanIUse Database..."
npm update caniuse-db

# Install Bower Components
echo "Installing Bower Components..."
cd app
bower install --allow-root > /dev/null

# Run Grunt Tasks
echo "Running Grunt Tasks..."
cd ..
echo "-> bower"
grunt bower > /dev/null
echo "-> sass"
grunt sass > /dev/null
echo "-> sassdown"
grunt sassdown > /dev/null
echo "-> watch"
grunt watch > watch.log &

# Install scss-lint gem
echo "Installing scss-lint Gem..."
gem install scss-lint > /dev/null

# Create Symlink
link=/var/www/html/app/js/bower_components
if [ ! -L $link ]; then
  echo "Creating Symlink to Bower Components..."
  ln -sf /var/www/html/app/bower_components $link
fi
